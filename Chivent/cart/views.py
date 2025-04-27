from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET','POST','DELETE','PATCH'])
def cart(request):
    # pull or init
    items = request.session.get('cart', [])

    if request.method == 'GET':
        return Response(items)

    if request.method == 'POST':
        # request.data should be your { id, title, price, … }
        items.append(request.data)
        request.session['cart'] = items
        return Response(items, status=201)

    if request.method == 'PATCH':
        # remove one item by id
        item_id = request.data.get('id')
        items = [i for i in items if i.get('id') != item_id]
        request.session['cart'] = items
        return Response(items)

    if request.method == 'DELETE':
        # clear entire cart
        request.session['cart'] = []
        return Response(status=204)
