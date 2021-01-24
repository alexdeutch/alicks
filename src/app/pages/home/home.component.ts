import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  state;
  reviews;
  cities;
  expanded = false;

  ngOnInit(): void {
    const options: {
      headers?: HttpHeaders;
      observe?: 'body';
      params?: HttpParams;
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    } = {
      responseType: 'text'
    };

    this.httpClient.get("https://docs.google.com/spreadsheets/d/1qUDdhcgmiXcHQ-bebcYgawFxdUxlP2mEXrLhEZG9V30/export?format=csv", options).toPromise().then(data => {
      const jsonArr = this.parseCsvToJson(data);
      this.cities = this.createStruct(jsonArr);
      this.state = this.initializeState(this.cities)
    })
  }

  expand = (city, type) => {
    if (this.state[`${city}${type}Expanded`]) {
      document.getElementById(`${city}${type}Container`).style.maxHeight = "0px";
      document.getElementById(`${city}${type}Container`).style.opacity = "0";
    } else {
      document.getElementById(`${city}${type}Container`).style.maxHeight = `${document.getElementById(`${city}${type}Container`).scrollHeight}px`;
      document.getElementById(`${city}${type}Container`).style.opacity = "1";
    }
    this.state[`${city}${type}Expanded`] = !this.state[`${city}${type}Expanded`];
  }

  initializeState = (data) => {
    let state = {};
    data.forEach(city => {
      city.types.forEach(type => {
        state[`${city.id}${type.id}Expanded`] = false
      });
    });
    return state;
  }

  checkState = (city, type) => {
    return this.state[`${city}${type}Expanded`]
  }

  toLowerRemoveSpace = (str) => {
    const strLower = str.toLowerCase();
    const strFinal = strLower.replace(/\s+/g, '');
    return strFinal;
  }

  parseCsvToJson = (csv) => {
    var csvJson = [];
    var row = 0;
    var baseObj = {};
    var rowObj = {};
    var str = '';
    var index = 0;
    for (var i = 0; i <= csv.length; i++) { 
      if (csv.charAt(i) != ',' && csv.charAt(i) != '\n') {
        str = str + csv.charAt(i);
        if (i === csv.length) {
          rowObj[Object.keys(rowObj)[index]] = str, csvJson.push(rowObj);
        }
      }
      if (csv.charAt(i) === ',') {
        row === 0 ? baseObj[str] = '' : (rowObj[Object.keys(rowObj)[index]] = str, index++);
        str = '';
      }
      if (csv.charAt(i) === '\n') {
        str = str.substring(0, str.length - 1)
        row === 0 ? baseObj[str] = '' : (rowObj[Object.keys(rowObj)[index]] = str, csvJson.push(rowObj));
        str = '';
        index = 0;
        rowObj = {...baseObj}
        row++;
      }
    }
    return csvJson;
  }

  //needs to be refactored
  createStruct = (jsonArr) => {
    var final = [];
    var dataContainer = {};
    jsonArr.forEach(el => {
      if(!dataContainer[el.city]) {
        dataContainer[el.city] = {};
      }
      if(!dataContainer[el.city][el.type]) {
        dataContainer[el.city][el.type] = [];
      }
      dataContainer[el.city][el.type].push({name: el.place, rateAlex: el.rateAlex, rateAlice: el.rateAlice, reviewAlex: el.reviewAlex, reviewAlice: el.reviewAlice});
    });
    const cities = Object.keys(dataContainer)
    var index = 0;
    cities.forEach(city => {
      final.push({id: this.toLowerRemoveSpace(city), name: city})
      const types = Object.keys(dataContainer[city])
      final[index]['types'] = [];
      types.forEach(type => {
        const placesArr = dataContainer[city][type]
        final[index]['types'].push({id: this.toLowerRemoveSpace(type), name: type, places: placesArr});
      })
      index++;
    })
    return final;
  }
}
