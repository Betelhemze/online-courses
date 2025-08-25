# generator.py
import ssl
import certifi
import whisper
import ffmpeg
import pysrt
import os
import sys
from googletrans import Translator
import spacy

# Fixes SSL certificate issues
ssl._create_default_https_context = lambda: ssl.create_default_context(cafile=certifi.where())

# Load SpaCy English model
nlp = spacy.load("en_core_web_sm")

def preserve_names(text):
    # Detect names in English text and replace with placeholders
    # Title-case text to help SpaCy detect names
    doc = nlp(text.title())
    names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]

    # include any capitalized word not already in names
    words = text.split()
    for w in words:
        if w[0].isupper() and w not in names:
            names.append(w)

    text_with_placeholders = text
    for i, name in enumerate(names):
        text_with_placeholders = text_with_placeholders.replace(name, f"__NAME{i}__")
    return text_with_placeholders, names

def restore_names(text, names):
     # Replace placeholders with original names
    restored_text = text
    for i, name in enumerate(names):
        restored_text = restored_text.replace(f"__NAME{i}__", name)
    return restored_text

def video_to_subtitles(video_path):
    if not os.path.exists(video_path):
        print(f"Video not found: {video_path}")
        return

    audio_path = "temp_audio.wav"
    try:
        # Extracting audio
        print("Extracting audio...")
        ffmpeg.input(video_path).output(audio_path, ac=1, ar=16000).run(overwrite_output=True)

        # Transcribing with whisper
        print("Loading Whisper model...")
        model = whisper.load_model("base")

        print("Transcribing audio...")
        result = model.transcribe(audio_path)

        # Creating English subtitles
        print("Creating English subtitles...")
        subs_en = pysrt.SubRipFile()
        for i, segment in enumerate(result["segments"]):
            start = pysrt.SubRipTime(seconds=int(segment['start']))
            end = pysrt.SubRipTime(seconds=int(segment['end']))
            subs_en.append(pysrt.SubRipItem(
                index=i+1,
                start=start,
                end=end,
                text=segment['text']
            ))

        video_name = os.path.splitext(os.path.basename(video_path))[0]
        output_srt_en = f"{video_name}_en.srt"
        subs_en.save(output_srt_en, encoding='utf-8')
        print(f"English subtitles saved as {output_srt_en}")

        # Translates to amharic with the name preservationg
        print("Translating subtitles to Amharic...")
        translator = Translator()
        subs_am = pysrt.SubRipFile()

        for item in subs_en:
            # Preserve names
            text_with_placeholders, names = preserve_names(item.text)
            # Translate
            translated = translator.translate(text_with_placeholders, src='en', dest='am')
            # Restore names
            translated_text = restore_names(translated.text, names)
            # Append to Amharic subtitles
            subs_am.append(pysrt.SubRipItem(
                index=item.index,
                start=item.start,
                end=item.end,
                text=translated_text
            ))

        output_srt_am = f"{video_name}_am.srt"
        subs_am.save(output_srt_am, encoding='utf-8')
        print(f"Amharic subtitles saved as {output_srt_am}")

    finally:
        # Cleans up temporary audio
        if os.path.exists(audio_path):
            os.remove(audio_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 generator.py /path/to/video.mp4")
    else:
        video_to_subtitles(sys.argv[1])
