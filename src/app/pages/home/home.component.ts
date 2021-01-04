import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  

  ngOnInit(): void {
  }

  expanded = false;

  cities = [
    {
      id: 'newyork',
      name:'New York',
      types: [
        {
          id: 'coffee',
          name: 'Coffee',
          places: [
            {name: 'Colina Cuervo', rateAlex:'good', rateAlice:'good', reviewAlex: "'It tastes very good and they do capuccino right and they sell counter culture which i don't like very much but it's fine.' -alex"},
            {name: 'Hungry Ghost', rateAlex:'bad', reviewAlex: "ew. -alex", reviewAlice: ":)"},
            {name: 'Lincoln Station', rateAlex:'bad', reviewAlex: "ew. -alex"},
            {name: 'Velvette Brew', rateAlex:'bad', reviewAlex: "they try so hard to make this look like it will be good but it is so bad. -alex"},
            {name: 'Little Zelda', rateAlex:'bad', reviewAlex: "they try so hard to make this look like it will be good but it is so bad. -alex"},
            {name: 'Aura Coffee', rateAlex:'neutral', reviewAlex: "they try so hard to make this look like it will be good but it is so bad. -alex"},
            {name: 'Konditori', rateAlex:'neutral', reviewAlex: "they try so hard to make this look like it will be good but it is so bad. -alex"},
            {name: 'Cafe Auburndale', rateAlex:'neutral', reviewAlex: "they try so hard to make this look like it will be good but it is so bad. -alex"},
            {name: 'GREY Coffee', rateAlex:'bad', reviewAlex: "they try so hard to make this look like it will be good but it is so bad. -alex"},
          ]
        }
      ]
    },
    {
      id: 'boston',
      name: 'Boston',
      types: [
        {
          id: 'coffee',
          name: 'Coffee',
          places: [
            {name: 'Three Little Figs', rate:'good', review: ""},
            {name: 'Diesel Cafe', rate:'bad', review: ""},
            {name: '1369 Coffeehouse', rate:'good', review: ""},
            {name: 'Revival Cafe + Kitchen', rate:'bad', review: ""},
            {name: 'True Grounds', rate:'good', review: ""},
            {name: 'Clover', rate:'neutral', review: ""},
            {name: 'Union Square Donuts', rate:'good', review: ""},
            {name: 'Pavement', rate:'good', review: ""},
            {name: 'Cafe Zing', rate:'bad', review: ""},
          ]
        }
      ]
    }
  ]

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

  parseCsvToJson = (csv) => {
    console.log(csv);
    return csv;
  }
}
