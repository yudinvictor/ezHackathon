from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404, FileResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import os
import pandas as pd


def index(request):
    res = {'ez': 'sosat'}
    return HttpResponse(res)


class TableDetail(APIView):

    def get(self, request):
        # requstType = requst.data['type']
        # arr = requst.data['arr']
        # pk, res = get_tables(arr, requstType)
        df = pd.read_csv('main/output.txt', sep='\t\t')
        columns = ['Номер', 'Старт', 'Новый старт', 'Штраф', 'Изначальная длительность', 'Фактическая длительность',
                   'Штраф за длину']
        df.columns = columns

        resp = {'columns': df.columns, 'table_1': df.to_numpy()[:20]}
        return Response(resp)


def upload(request):
    if request.method == 'POST':
        print(request.FILES)
    return JsonResponse({'ok': True})
