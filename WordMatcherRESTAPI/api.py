import flask
from flask import Flask, request
from flask_restful import Resource, Api
import WordMatcher
import json

app = Flask(__name__)
api = Api(app)


class Intro(Resource):
    def get(self):
        return {'Hello': 'Send a GET request to / with words separated by & to get moods.'}

class Matcher(Resource):
    def get(self, moodList):
        #query = request.get_json(force=False, silent=False,cache=True)
        #print "Mood list: ",moodList
        query = moodList.split('&')
        # print "query: ",query
        # print query[0]
        # print len(query[0])
        query = filter(lambda x:len(x) > 1, query)
        print "post filter query: ",query
        if query == None:
            return []
        moods = WordMatcher.match(query) 
        resp = flask.Response(json.dumps(moods))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

    # def post(self, moods):
    #     query = request.get_json(force=False, silent=False,cache=True)
    #     if query == None:
    #         return []
    #     moods = WordMatcher.match(query) 
    #     resp = flask.Response(json.dumps(moods))
    #     resp.headers['Access-Control-Allow-Origin'] = '*'
    #     return resp

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
#   return response

api.add_resource(Intro, '/')
api.add_resource(Matcher, '/<string:moodList>')

if __name__ == '__main__':
    app.run(debug=False)