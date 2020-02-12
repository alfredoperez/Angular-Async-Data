import {Component, EventEmitter, OnInit, Output, HostListener} from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import {BehaviorSubject, Observable, Subject, of, combineLatest, fromEvent } from 'rxjs';
import {catchError, tap, debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-asyncPipe.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListAsyncPipeComponent implements OnInit {
  @Output() productsSelectedChange: EventEmitter<Product> = new EventEmitter();

  pageTitle = 'Product List';
  resizingLabel = '';
  products$: Observable<Product[] | null>;

  public selectionChangedSubject = new BehaviorSubject<Product>(null);
  public selectionChangedAction$ = this.selectionChangedSubject.asObservable();
  resize$ = new Subject<void>();

  /* Use *either* error$ or errorMessage, not both */
  error$ = new Subject<string>();
  errorMessage = '';

  constructor(private productService: ProductService) { }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts()
      .pipe(
        catchError(error => {
          /* Use *either* error$ or errorMessage, not both */
          this.error$.next(error);
          // this.errorMessage = error;
          return of(null);
        })
      );

    // NOTE: Supposing we need data from another observable to build the data emitted on the event
    combineLatest([this.selectionChangedAction$, this.products$ ])
      .pipe(
        tap(([selected, allProducts]) => {
            if (selected !== null) {
              const target =  allProducts.find(item => selected.id === item.id);
              this.productsSelectedChange.emit(target);
            }
          }
        )
      )
      .subscribe(); // NOTE: How do we avoid this subscription?

    // NOTE: How do we avoid this subscription?
    this.resize$.pipe(debounceTime(300))
      .subscribe(() => {
      this.resizingLabel = `resizing action... E.g. resize grid base on size. width: ${window.outerWidth}  height: ${window.outerHeight}`;
    });
  }


  onProductSelected(product: Product) {
    this.selectionChangedSubject.next(product);
  }
}
