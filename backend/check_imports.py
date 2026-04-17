import sys
import traceback

modules = [
    'fastapi',
    'sqlalchemy',
    'google.generativeai',
    'google_play_scraper',
    'app_store_scraper',
    'playwright',
    'langdetect',
    'deep_translator',
    'sklearn',
    'pandas',
    'uvicorn',
    'emoji',
    'requests',
    'urllib3',
    'six'
]

def check():
    print("--- Sentiq Import Integrity Check ---")
    failed = False
    for mod in modules:
        try:
            __import__(mod)
            print(f"[OK] {mod}")
        except ImportError:
            print(f"[FAILED] {mod}")
            traceback.print_exc()
            failed = True
        except Exception as e:
            print(f"[ERROR] {mod}: {e}")
            failed = True
            
    if failed:
        print("\n--- CHECK FAILED: Resolve missing modules above ---")
        sys.exit(1)
    else:
        print("\n--- ALL MODULES READY ---")
        sys.exit(0)

if __name__ == "__main__":
    check()
