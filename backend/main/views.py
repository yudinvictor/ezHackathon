from django.http import JsonResponse
from django.shortcuts import render

def upload(request):
    if request.method == 'POST':
        print(request.FILES)
    return JsonResponse({'ok': True})