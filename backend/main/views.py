from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404, FileResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import os
import pandas as pd
from django.views.decorators.csrf import csrf_exempt
from main.functions import save_obj, load_obj
import json


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


@csrf_exempt
def upload(request):
    if request.method == 'POST':
        names = {}
        with open('input.txt', 'wb') as f:
            f.write(request.FILES['file'].read())
        with open('input.txt') as file:
            for line in file.readlines():
                elems = line.split()
                if len(elems) < 4:
                    continue 
                id = elems[0]
                name = elems[1]
                names[id] = name

        save_obj(names, 'names')

    return JsonResponse({'ok': True})


def get_resp():
    penalty = []
    arr = []
    dct = {}
    dct['columns'] = ['Номер', 'Старт', 'Новый старт', 'Штраф за перенос даты', 'Изначальная длительность',
                      'Фактическая длительность', 'Штраф за изменение длительности']

    now_id = False
    columns = ['Номер', 'Старт', 'Новый старт', 'Штраф за перенос даты', 'Изначальная длительность',
               'Фактическая длительность', 'Штраф за изменение длительности']
    new_columns = columns[:-2]
    dct['columns'] = new_columns
    with open('output.txt') as file:
        for line in file.readlines():
            elems = line.strip().split()
            if len(elems) > 2:
                arr.append(list(map(int, elems)))
            else:
                if now_id != False:
                    tmp_df = pd.DataFrame(arr, columns=columns).sort_values(
                        ['Штраф за перенос даты', 'Штраф за изменение длительности'], ascending=False)
                    
                    tmp_df = tmp_df[new_columns]
                    dct[str(now_id)] = tmp_df.to_numpy()
                    arr = []
                if len(elems) == 2:
                    penalty.append((int(elems[0]), int(elems[1])))
                if len(elems) == 1:
                    now_id = int(elems[0])

        tmp_df = pd.DataFrame(arr, columns=columns).sort_values(['Штраф за перенос даты', 'Штраф за изменение длительности'],
                                                           ascending=False)
        tmp_df = tmp_df[new_columns]
        dct[str(now_id)] = tmp_df.to_numpy()
    dct['penalty'] = penalty
    return dct


def change_graph(id, start_date, duration):
    print('change graph', id, start_date, duration)
    new_file = []

    with open('input.txt', 'r') as file:
        for line in file.readlines():
            elems = line.strip().split()
            if len(elems) > 3:
                if elems[0] != str(id):
                    new_file.append(elems)
                    continue
                if start_date == '':
                    start_date = elems[2]
                if duration == '':
                    duration = elems[5]
                elems[2] = start_date
                elems[3] = -1
                elems[4] = -1
                elems[5] = duration
                new_file.append(elems)
            else:
                new_file.append(elems)

    with open('input.txt', 'w') as file:
        for line in new_file:
            file.write(' '.join(map(str, line)) + '\n')


@csrf_exempt
def add_change(request):
    if request.method == 'POST':
        print('data_to_add_change', json.loads(request.body.decode('utf-8')))
        change_graph(**json.loads(request.body.decode('utf-8')))
        #os.system('.\\rosatom.exe')
        #return Response(get_resp())
    return JsonResponse({'ok': True})


class GetResult(APIView):
    def get(self, request):
        print('start')
        os.system('.\\rosatom.exe')
        print('stop')
        resp = get_resp()
        
        #print(resp.keys())
        return Response(resp)
