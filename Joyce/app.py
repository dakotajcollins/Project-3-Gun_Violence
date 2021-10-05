from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from datetime import datetime, timedelta
from itertools import chain
from flask import render_template, redirect, url_for, request, send_from_directory, flash


# create engine to hawaii.sqlite
engine = create_engine("sqlite:///Resources/gun_dataset.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# View all of the classes that automap found
Base.classes.keys()

# Save references to each table
gun_sale = Base.classes.Gun_sale
gun_violence_2019 = Base.classes.Gun_violence_2019
gun_violence_2020 = Base.classes.Gun_violence_2020
gun_violence_2021 = Base.classes.Gun_violence_2021
completed_data=Base.classes.completed_final_data
state_coords=Base.classes.state_coords


#Set up Flask
app = Flask(__name__)

@app.route("/")

def welcome():
    html=f"""This is the main page.
        <br> These links are for demo only.  If you use this as an api, route directly to the link that returns your data
        <br>  In this case the "get all of the data" link
        <br>  If you are running this locally remember that you will want to remove /dev from the url.
            <br> <a href=/api/v1.0/gunsalebystate>Gun Sale data by State</a> 
            <br> <a href=/api/v1.0/gunviolence2019>gun violence mass shooting on 2019</a>
            <br> <a href=/api/v1.0/gunviolence2020>gun violence mass shooting on 2020</a>
            <br> <a href=/api/v1.0/gunviolence2021>gun violence mass shooting on 2021</a>
            <br> <a href=/api/v1.0/completedata> Completed data includ accurate Lat & Lon from 2019 to 2021 </a>
            <br> <a href=/api/v1.0/statecoords> State Coords </a>
            """
    return html

# Convert the query results to a Dictionary using date as the key and prcp as the value.
@app.route("/api/v1.0/gunsalebystate")
def gunsalebystate():
    list_gunsale=[]
    session = Session(engine)
    Gun_sale_data= session.query(gun_sale.State, gun_sale.Year_2017,gun_sale.Year_2018,gun_sale.Year_2019,
                                gun_sale.Year_2020,gun_sale.Year_2021).all()
    session.close()

 
    for data in Gun_sale_data:
        dict_sale={}
        dict_sale['State'] = data[0]
        dict_sale['feature'] = {}
        

        dic_state={}
        dic_state['2017'] = data[1]
        dic_state['2018'] = data[2]
        dic_state['2019'] = data[3]
        dic_state['2020'] = data[4]
        dic_state['2021'] = data[5]

        
        dict_sale['feature'] = dic_state
        list_gunsale.append(dict_sale)

        
    return jsonify(list_gunsale)


@app.route("/api/v1.0/gunviolence2019")
def gunviolence_2019():
    list_gv19=[]
    session = Session(engine)
    Gun_violence_2019_data= session.query(gun_violence_2019.IncidentID, gun_violence_2019.State, gun_violence_2019.CityOrCounty,
                                        gun_violence_2019.Address,gun_violence_2019.Killed, gun_violence_2019.Injured, gun_violence_2019.Date,
                                        gun_violence_2019.Year, gun_violence_2019.Latitude, gun_violence_2019.Longitude).all()
    session.close()

    for data in Gun_violence_2019_data:
        dic_gv19={}
        dic_gv19['IncidentID']=data[0]
        dic_gv19['feature']={}

        dic_gvf19={}
        dic_gvf19['State']=data[1]
        dic_gvf19['City']=data[2]
        dic_gvf19['Address']=data[3]
        dic_gvf19['Killed']=data[4]
        dic_gvf19['Injured']=data[5]
        dic_gvf19['Date']=data[6]
        dic_gvf19['Year']=data[7]
        dic_gvf19['Latitude']=data[8]
        dic_gvf19['Longitude']=data[9]
        dic_gv19['feature']=dic_gvf19
        list_gv19.append(dic_gv19)
        

    return jsonify(list_gv19)



@app.route("/api/v1.0/gunviolence2020")
def gunviolence_2020():
    list_gv20=[]
    session = Session(engine)
    Gun_violence_2020_data= session.query(gun_violence_2020.IncidentID, gun_violence_2020.State, gun_violence_2020.CityOrCounty,
                                        gun_violence_2020.Address,gun_violence_2020.Killed, gun_violence_2020.Injured, gun_violence_2020.Date,
                                        gun_violence_2020.Year, gun_violence_2020.Latitude, gun_violence_2020.Longitude).all()
    session.close()

    for data in Gun_violence_2020_data:
        dic_gv20={}
        dic_gv20['IncidentID']=data[0]
        dic_gv20['feature']={}

        dic_gvf20={}
        dic_gvf20['State']=data[1]
        dic_gvf20['City']=data[2]
        dic_gvf20['Address']=data[3]
        dic_gvf20['Killed']=data[4]
        dic_gvf20['Injured']=data[5]
        dic_gvf20['Date']=data[6]
        dic_gvf20['Year']=data[7]
        dic_gvf20['Latitude']=data[8]
        dic_gvf20['Longitude']=data[9]
        dic_gv20['feature']=dic_gvf20
        list_gv20.append(dic_gv20)
        

    return jsonify(list_gv20)


@app.route("/api/v1.0/gunviolence2021")
def gunviolence_2021():
    list_gv21=[]
    session = Session(engine)
    Gun_violence_2021_data= session.query(gun_violence_2021.IncidentID, gun_violence_2021.State, gun_violence_2021.CityOrCounty,
                                        gun_violence_2021.Address,gun_violence_2021.Killed, gun_violence_2021.Injured, gun_violence_2021.Date,
                                        gun_violence_2021.Year, gun_violence_2021.Latitude, gun_violence_2021.Longitude).all()
    session.close()

    for data in Gun_violence_2021_data:
        dic_gv21={}
        dic_gv21['IncidentID']=data[0]
        dic_gv21['feature']={}

        dic_gvf21={}
        dic_gvf21['State']=data[1]
        dic_gvf21['City']=data[2]
        dic_gvf21['Address']=data[3]
        dic_gvf21['Killed']=data[4]
        dic_gvf21['Injured']=data[5]
        dic_gvf21['Date']=data[6]
        dic_gvf21['Year']=data[7]
        dic_gvf21['Latitude']=data[8]
        dic_gvf21['Longitude']=data[9]
        dic_gv21['feature']=dic_gvf21
        list_gv21.append(dic_gv21)
        

    return jsonify(list_gv21)




@app.route("/api/v1.0/completedata")
def complete_data():
    list_cfd=[]
    session = Session(engine)
    completed_dataset= session.query(completed_data.IncidentID, completed_data.State, completed_data.CityOrCounty,
                                        completed_data.StreetAddress,completed_data.Full_Address ,completed_data.Killed, completed_data.Injured, 
                                        completed_data.Date, completed_data.Year, completed_data.Latitude, completed_data.Longitude).all()
    session.close()

    for data in completed_dataset:
        dic_cfd={}
        dic_cfd['IncidentID']=data[0]
        dic_cfd['feature']={}

        dic_cfdf={}
        dic_cfdf['State']=data[1]
        dic_cfdf['City']=data[2]
        dic_cfdf['Address']=data[3]
        dic_cfdf['Full Address']=data[4]
        dic_cfdf['Killed']=data[5]
        dic_cfdf['Injured']=data[6]
        dic_cfdf['Date']=data[7]
        dic_cfdf['Year']=data[8]
        dic_cfdf['Latitude']=data[9]
        dic_cfdf['Longitude']=data[10]
        dic_cfd['feature']=dic_cfdf
        list_cfd.append(dic_cfd)
        

    return jsonify(list_cfd)


@app.route("/api/v1.0/statecoords")
def statecoord_data():
    list_sc=[]
    session = Session(engine)
    state_coords_dataset= session.query(state_coords.State, state_coords.Latitude, state_coords.Longitude).all()
    session.close()

    for data in state_coords_dataset:
        dic_sc={}
        dic_sc['State']=data[0]
        dic_sc['feature']={}

        dic_scf={}
        dic_scf['Latitude']=data[1]
        dic_scf['Longitude']=data[2]
        dic_sc['feature']=dic_scf
        list_sc.append(dic_sc)
        

    return jsonify(list_sc)

if __name__ == '__main__':
    app.run(debug=True)