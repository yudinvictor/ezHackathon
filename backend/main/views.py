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
from main.functions import load_obj, save_obj
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
    names = dict()
    vehs = dict()
    if request.method == 'POST':
        with open('input.txt', 'wb') as f:
            f.write(request.FILES['file'].read())
        with open('input.txt') as file:
            for line in file.readlines():
                elems = line.strip().split()
                if len(elems) < 4:
                    continue 
                id = elems[0]
                name = elems[1]
                vehs[int(id)] = (elems[-1] == 'True')
                names[int(id)] = name

        save_obj(names, 'names')
        save_obj(vehs, 'vehs')        

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

    name_col = 'Имя'
    name_veh = 'is_big'
    new_columns =  [columns[0]] + [name_col] + columns[1:] + [name_veh]
    dct['columns'] = new_columns
    critical = dict()
    names_dict = load_obj('names')
    vehs_dict = load_obj('vehs')

    with open('output.txt') as file:
        flag = True
        for line in file.readlines():
            elems = line.strip().split()
            if len(elems) > 2:
                arr.append(list(map(int, elems)))
            else:
                if now_id != False:
                    tmp_df = pd.DataFrame(arr, columns=columns).sort_values(
                        ['Штраф за перенос даты', 'Штраф за изменение длительности'], ascending=False)
                    tmp_df[name_col] = tmp_df['Номер'].apply(lambda x: names_dict[x].replace('_', ' '))
                    tmp_df[name_veh] = tmp_df['Номер'].apply(lambda x: vehs_dict[x])
                    tmp_df = tmp_df[new_columns]
                    dct[str(now_id)] = tmp_df.to_numpy()
                    arr = []
                if len(elems) == 2:
                    penalty.append([int(elems[0]), int(elems[1])])
                if len(elems) == 1:
                    if flag:
                        now_id = int(elems[0])
                        flag = False
                    else:
                        critical[now_id] = int(elems[0])
                        flag = True 

        for idx in range(len(penalty)):
            penalty[idx].append(critical[penalty[idx][0]])

        tmp_df = pd.DataFrame(arr, columns=columns).sort_values(['Штраф за перенос даты', 'Штраф за изменение длительности'],
                                                           ascending=False)

        tmp_df[name_col] = tmp_df['Номер'].apply(lambda x: names_dict[x].replace('_', ' '))
        tmp_df[name_veh] = tmp_df['Номер'].apply(lambda x: vehs_dict[x])                                                           
        tmp_df = tmp_df[new_columns]
        dct[str(now_id)] = tmp_df.to_numpy()
    dct['penalty'] = penalty
    print(dct['penalty'])
    return dct


def change_graph(id, start_date, duration):
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
        print(json.loads(request.body.decode('utf-8')))
        change_graph(**json.loads(request.body.decode('utf-8')))
        # os.system('.\\rosatom.exe')
    return JsonResponse({'ok': True})


class GetResult(APIView):
    def get(self, request):
        #print(resp.keys())
        print('start')
        os.system('.\\rosatom1.exe')
        resp = get_resp()
        print('stop')
        return Response(resp)
