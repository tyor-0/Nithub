// ecommerce shopping cart 
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

interface CartItem {
    product: Product;
    amount: number;
}

interface CheckOut{
    items: CartItem[];
    total: number;
}

interface Receipt {
    items: CartItem[];
    totalAmount: number;
    date: Date;
}

interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: Address;
}

//if i want to shop, lets say i enter a mall, i will get a trolly, then add to cart the products i want to buy, when i am done, i will headover to the counter to checkout then pay, i will get a reciept then buy

//temu - enter the app- view product, add to cart, add number of product/add amount, view cart, then checkout, recieve invoice 

//think of interface and methods as noun and verbs - interface is the noun - methodis the verb - play ball - ball - any substain in this action must have this - required information - the interface is the thing - the method is the behavior

class Shopping {
    private id: string;  //every shopping cart object must have an id inside itself
    private customer: Customer;
    private products: Product[] = [];
    private carts: CartItem[] = [];

    constructor(orderId: string, customer: Customer, products: Product[]) {
        this.id = orderId;   // save the orderId in constructor or the newly created class or instance id, in this shoppingcart object id - store this new values for this new person/object 
        this.customer = customer;
        this.products = products;
    }

      //adding to cart
    public addToCart(productId: number, amount: number) {
       const product = this.products.find(product => product.id === productId);
       if(!product){
        console.log("Product not found");
        return;
       }

       if (product.stock < amount) {
        console.log("Not enough stock available");
        return;
       }

       const cartItem = this.carts.find(item => item.product.id === productId);

       if (cartItem) {
        cartItem.amount += amount;
       } else {
        this.carts.push({
            product: product,
            amount: amount
        })
       }

       product.stock -= amount;
       console.log(`${amount} ${product.name} added to cart`);
    }

    //getting the total of price in the cart 
    public calculateTotal(): number {
        let total = 0;

        this.carts.forEach(item => {
            total += item.product.price * item.amount;
        });

        return total;
    }

    //removing from cart

    public removeFromCart(productId: number){
        const cartItem = this.carts.find(cartitem => cartitem.product.id === productId)
        if(!cartItem) {
            console.log("Product is not in cart");
            return;
        }

        cartItem.product.stock += cartItem.amount;
        this.carts = this.carts.filter(item => item.product.id !==  productId);

        console.log(`${cartItem.product.name} removed from cart`);
        
    }

    //sorting by price - it has acces already to the object you dont need to give it anything
  public sortByPrice(): void {
    this.products.sort((a, b) => a.price - b.price);

    console.log("Products sorted from cheapest to most expensive");
}

    //searching by name of item 
    public searchProduct(name: string): Product | null {
        const product = this.products.find(
            product => product.name.toLowerCase() === name.toLowerCase()
        );

        if (!product) {
            return null;
        }

        return product;
    }

    //checkout 
    public checkout(): Receipt {
        const receipt: Receipt ={
            items: this.carts,
            totalAmount: this.calculateTotal(),
            date: new Date()
        }

        this.carts = [];
        return receipt
    }
}


class student { //this is what student should have and do
    private id: number; // this student/ this student has a special matric numeber 
    private name: string; // This student object has a private name stored inside it

    constructor(name: string, id: number) {  // when creating the student he must have name - temporary value 
        this.name = name;  // save the name you gave me inside this studnet object/ student id - copy it back to the class storage
        this.id = id;
    }
}

//every method must always have a recieve and return, input and output
//think it two's - 0 or 1, true or false, fail or not fail, dont assume 