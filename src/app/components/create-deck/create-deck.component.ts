import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/response';
import { DeckrepoService } from 'src/app/service/deckrepo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent implements OnInit{
  numberOption: number[] = [1,2,3,4,5,6,7,8,9,10];
  deckForm!: FormGroup;

  constructor(private fb: FormBuilder, private dRepo: DeckrepoService, private router: Router) {}

  ngOnInit(): void {
    this.deckForm = this.fb.group({
      decknumber: this.fb.control(this.numberOption[0], [Validators.required])
    })
  }

  generateDecks() {
    (this.dRepo.getNumberOfDecks(this.deckForm.value['decknumber'])
              .subscribe(v => this.router.navigate(['/draw', v.deck_id])))
  }
}
