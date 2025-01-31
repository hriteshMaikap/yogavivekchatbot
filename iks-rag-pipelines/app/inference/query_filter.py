from groq import Groq
import os
from better_profanity import profanity

client = Groq(api_key=os.getenv['GROQ_API_KEY'])


## to detect profanity in language
def check_offensive_language(text):
    profanity.load_censor_words()
    if profanity.contains_profanity(text):
        return 1
    else:
        return 0





## templates to filter right and wrong queries by user

def check_valid_1(context=""):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a strict text classifier that evaluates sentences. "
                    "Classify the input strictly as 0 or 1 based on the following rules: "
                    "Output 0 if the sentence contains foul language, offensive words, or is unrelated to the Bhagavad Gita or Yoga Sutras. "
                    "A sentence is considered related if it explicitly mentions concepts, teachings, verses, or philosophies found in the Bhagavad Gita or Yoga Sutras. "
                    "Examples of related content include discussions on dharma, karma, yoga, meditation, moksha, or any references to the texts themselves. "
                    "Output 1 that are directly or indirectly related to the Bhagavad Gita or Yoga Sutras. "
                    "Strictly follow the format and respond only with 0 or 1."
                ),
            },
            {
                "role": "user",
                "content": f"{context} - Classify the sentence as 0 or 1:",
            },
        ],
        model="llama3-8b-8192",
        max_tokens=3,
    )
    return chat_completion.choices[0].message.content


def check_valid_2(context=""):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an advanced and strict text classifier specializing in evaluating whether a given sentence is related to the Bhagavad Gita or the Yoga Sutras. "
                    "Your task is to classify the input strictly as 0 or 1 based on the following detailed rules:\n\n"

                    "1. **Output 0** if the sentence contains:\n"
                    "   - Foul language, offensive words, or any inappropriate content.\n"
                    "   - Topics completely unrelated to spiritual wisdom, philosophy, or self-realization.\n"
                    "   - General motivational quotes or religious discussions that do not specifically reference the Bhagavad Gita or Yoga Sutras.\n"
                    "   - Random discussions on yoga that focus only on physical exercises (asanas) without any philosophical or spiritual connection.\n\n"

                    "2. **Output 1** if the sentence is directly or indirectly related to the Bhagavad Gita or Yoga Sutras. This includes but is not limited to:\n"
                    "   - Questions seeking enlightenment, self-realization, or understanding of spiritual wisdom.\n"
                    "   - Discussions on key concepts like dharma, karma, moksha, atman, bhakti, jnana, and meditation.\n"
                    "   - Queries referencing specific verses, teachings, or interpretations of the Bhagavad Gita or Yoga Sutras.\n"
                    "   - Philosophical inquiries about life, duty, righteousness, or detachment that align with these scriptures.\n"
                    "   - Comparisons of Bhagavad Gita teachings with other spiritual traditions if the focus remains on the Gita’s or Sutras’ wisdom.\n"
                    "   - Discussions on how to apply the Bhagavad Gita’s teachings in daily life, work, or personal struggles.\n\n"

                    "Your response must strictly follow this format: Respond with only '0' or '1' without any additional text."
                ),
            },
            {
                "role": "user",
                "content": f"'{context}' - Classify the sentence as 0 or 1:",
            },
        ],
        model="llama3-8b-8192",
        max_tokens=3,
    )
    return chat_completion.choices[0].message.content

def check_valid_3(context=""):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an advanced text classifier for a Bhagavad Gita and Yoga Sutras chatbot. "
                    "Your task is to determine if a given input is relevant to these scriptures and should be processed by the chatbot.\n\n"

                    "Strictly classify the input as either:\n"
                    "1️⃣ **Output '1' (Relevant)** if the sentence is directly or indirectly related to the Bhagavad Gita or Yoga Sutras. This includes:\n"
                    "   - Genuine **questions seeking enlightenment, wisdom, or self-realization**.\n"
                    "   - Queries about **dharma (righteous duty), karma (action and consequence), moksha (liberation), atman (soul), bhakti (devotion), or jnana (knowledge)**.\n"
                    "   - Requests for **explanations of verses, teachings, or philosophical insights** from these texts.\n"
                    "   - Questions on **how to apply Bhagavad Gita or Yoga Sutra principles in daily life**.\n"
                    "   - Inquiries about **meditation, mind control, detachment, or self-discipline** as taught in these scriptures.\n"
                    "   - Comparisons between **Bhagavad Gita and other spiritual or philosophical traditions**, as long as the focus remains on its teachings.\n\n"

                    "2️⃣ **Output '0' (Irrelevant)** if the sentence is unrelated, offensive, or inappropriate. This includes:\n"
                    "   - Any **foul language, offensive words, or disrespectful content**.\n"
                    "   - Topics unrelated to Bhagavad Gita, Yoga Sutras, or their philosophies (e.g., general fitness, politics, pop culture).\n"
                    "   - Generic discussions on yoga that only focus on physical exercise (asanas) without any philosophical or spiritual depth.\n"
                    "   - Motivational or religious statements that do not directly relate to Bhagavad Gita or Yoga Sutras.\n"
                    "   - Casual greetings, small talk, or unrelated chit-chat (e.g., 'How’s your day?', 'What’s the weather like?').\n\n"

                    "⚠️ **Strictly follow the classification format:** Your response must be either **'0'** or **'1'**, with no additional text."
                ),
            },
            {
                "role": "user",
                "content": f"'{context}' - Classify the sentence as 0 or 1:",
            },
        ],
        model="llama3-8b-8192",
        max_tokens=3,
    )
    return chat_completion.choices[0].message.content


