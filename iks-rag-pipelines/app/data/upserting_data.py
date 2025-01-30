import pickle
import pandas as pd
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct
from qdrant_client.http.models import Distance, VectorParams
from dotenv import load_dotenv
import os

def load_data_to_qdrant(path_embed,path_sentence):
    load_dotenv()
    
    with open(f"{path_embed}.pkl", "rb") as fp:
        sentence_embedings = pickle.load(fp)
    with open(f"{path_sentence}.pkl", "rb") as f:
        enhanced_sentences = pickle.load(f)
    
    qdrant_client = QdrantClient(
        url="https://bbe512e4-6b6e-475e-bfb5-fe04f5797900.europe-west3-0.gcp.cloud.qdrant.io:6333", 
        api_key=os.environ.get('QDRANT_API_KEY'),
    )
    
    collection_name = "Yoga"
    vector_size = len(sentence_embedings[0])  
    qdrant_client.recreate_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE)  
    )
    
    for i in range(len(sentence_embedings)):
        qdrant_client.upsert(
            collection_name="Yoga",
            points=[
                {
                    "id": i,
                    "vector": sentence_embedings[i],
                    "translation": enhanced_sentences[i],
                    "payload": {} 
                }
            ]
        )
    
    print("Data loaded successfully.")

load_data_to_qdrant()
