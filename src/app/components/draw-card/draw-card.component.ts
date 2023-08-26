import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckrepoService } from 'src/app/service/deckrepo.service';

@Component({
  selector: 'app-draw-card',
  templateUrl: './draw-card.component.html',
  styleUrls: ['./draw-card.component.css']
})
export class DrawCardComponent implements OnInit{

  deckIdParam!: string;
  cardsArray: {image: string, name: string}[] = [];
  cardNamesArray: string[] = [];
  cardsLeft: number = 0;
  disableButton: boolean = false;

  @ViewChild('cardNumberInput')
  numberInput!: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private dRepo: DeckrepoService) {}

  ngOnInit(): void {
    this.deckIdParam = this.activatedRoute.snapshot.params['deckId'];
    this.drawCard(this.deckIdParam, 0) 
  }

  handleClick() {
    let cardNumber = this.numberInput.nativeElement.value;
    console.log(cardNumber);
    if (cardNumber === "") {
      this.drawCard(this.deckIdParam, 0);
    }
    else {
      this.drawCard(this.deckIdParam, cardNumber);
      console.log(this.cardsLeft);
      if (this.cardsLeft <= cardNumber) {
        this.disableButton = true;
      }
    }
  }
  
  drawCard(deckId: string, cardsToDraw: number) {
    // Call service to call api to get cards
    this.dRepo.getCards(deckId, cardsToDraw)
              .subscribe(v => {
                if (v.cards.length !== 0) {
                  v.cards.forEach((cardObject: { image: string; value: any; suit: any; }) => {
                    this.cardsArray.push({image: cardObject.image, name: `${cardObject.value} OF ${cardObject.suit}`});
                  })
                }
                this.cardsLeft = v.remaining;
              })
  }
}
