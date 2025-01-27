import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { budgetItem } from '../interfaces/budgetItem.interface';

@Component({
  selector: 'app-budget-card',
  imports: [CommonModule],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.scss',
})
export class BudgetCardComponent {
  constructor(private router: Router) {}
  @Input() viewDetailsBtn = false;
  @Input() deleteBudgetBtn = false;
  @Input() renameBudgetBtn = false;
  @Input() currentCard!: budgetItem;
  viewDetails() {
    console.log('moza current' + JSON.stringify(this.currentCard));
    this.router.navigate(['/details', this.currentCard.id]);
  }
}
