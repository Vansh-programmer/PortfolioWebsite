from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, 'main/index.html')

@csrf_exempt
def terminal_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            command = data.get('command', '').strip().lower()
            
            if command == 'whois vansh':
                output = (
                    "\n[!] CANDIDATE PROFILE EXECUTED...\n"
                    "Name: Vansh Poonia\n"
                    "Role: Full-Stack Developer & Technical Problem Solver\n"
                    "Core Stack: Django, Python, React, Vanilla JS, SQL, APIs\n"
                    "Why hire him?: Builds custom architecture from scratch (like this terminal!), "
                    "learns insanely fast, and focuses on shipping real impact rather than just copying tutorials.\n"
                    "Status: OPEN TO OFFERS \n"
                )
            elif command == 'sudo hire vansh':
                output = (
                    "\n[sudo] password for recruiter: ********\n"
                    "Authentication successful.\n"
                    "Initiating hiring sequence...\n"
                    "SUCCESS: Offer letter generated.\n"
                    "Please execute the visual 'Get in touch' command at the top of the screen to proceed!\n"
                )

            elif command == 'help':
                output = (
                    "\nAvailable Commands:\n\n"
                    "  whois vansh     : Print candidate profile\n"
                    "  sudo hire vansh : Execute hiring sequence\n"
                    "  ls              : List directory contents\n"
                    "  cd <dir>        : Change directory\n"
                    "  pwd             : Print working directory\n"
                    "  cat <file>      : Read a file\n"
                    "  open <file>     : Open GUI application\n"
                    "  clear           : Clear screen\n"
                    "  exit            : Close terminal\n"
                )
            else:
                output = f"bash: {command}: command not found (or passed to backend unnecessarily)"
                
            return JsonResponse({'status': 'success', 'output': output})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST allowed'}, status=405)
