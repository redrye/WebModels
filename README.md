# Model.ts

## Overview
The `Model` Class provides an additional layer of abstraction on top of `BaseModel`. It integrates `EventEmitter` to support event-driven interactions within model instances. This combination allows for handling complex workflows and enabling listeners to respond to changes in the model.

## Features
- Extends core functionalities of `BaseModel`.
- Incorporates event-driven programming through `EventEmitter`.
- Ensures state change tracking with events.
- Customizable methods tailored to specific model needs.

## Usage
To utilize `Model.ts`, extend it to create specialized models and take advantage of its built-in event system.

```typescript
import Model from './Model';

class ProductModel extends Model {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    super();
    this.name = name;
    this.price = price;
  }

  updatePrice(newPrice: number) {
    this.price = newPrice;
    this.emit('priceUpdated', { price: newPrice });
  }
}

// Example usage
const product = new ProductModel('Laptop', 1000);
product.on('priceUpdated', (data) => console.log('Price updated to:', data.price));

product.updatePrice(1200);
```

## Methods

### `constructor()`
Initializes the model, combining `BaseModel` functionalities with `EventEmitter`.

```typescript
constructor() {
  super();
  this.emitter = new EventEmitter();
}
```

### `on(event: string, listener: (...args: any[]) => void): void`
Registers an event listener for the model instance.

```typescript
on(event: string, listener: (...args: any[]) => void): void {
  this.emitter.on(event, listener);
}
```

### `off(event: string, listener: (...args: any[]) => void): void`
Removes a specific event listener for the model instance.

```typescript
off(event: string, listener: (...args: any[]) => void): void {
  this.emitter.off(event, listener);
}
```

### `emit(event: string, ...args: any[]): void`
Emits an event, triggering all registered listeners for that event.

```typescript
emit(event: string, ...args: any[]): void {
  this.emitter.emit(event, ...args);
}
```

### `validate(): boolean`
Performs model-specific validation logic, ensuring data integrity.

```typescript
validate(): boolean {
  // Override for specific validation logic
  return true;
}
```

### `save(): Promise<void>`
Persists the current state of the model and optionally emits a `saved` event.

```typescript
async save(): Promise<void> {
  await super.save();
  this.emit('saved');
}
```

### `delete(): Promise<void>`
Removes the current model instance and emits a `deleted` event.

```typescript
async delete(): Promise<void> {
  await super.delete();
  this.emit('deleted');
}
```

## Properties

### `emitter: EventEmitter`
An instance of `EventEmitter` that handles the event-driven functionalities.

## Example: UserModel

```typescript
import Model from './Model';

class UserModel extends Model {
  username: string;
  email: string;

  constructor(username: string, email: string) {
    super();
    this.username = username;
    this.email = email;
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.emit('emailUpdated', { email: newEmail });
  }
}

// Usage example
const user = new UserModel('JohnDoe', 'john@example.com');
user.on('emailUpdated', (data) => console.log('Updated email:', data.email));

user.updateEmail('newjohn@example.com');
```

## Benefits
The integration of `EventEmitter` into `Model.ts` enables:
- Clear separation of concerns with event-driven updates.
- Simplified listener management for model-specific events.
- Enhanced adaptability and modularity in application design.

 <br>
  <br>

---
 <br>
  <br>

# EventEmitter class
<br>

## Overview
The `EventEmitter` class implements a lightweight event-driven architecture. It provides the ability to handle event listening and triggering, making it easy to build flexible and decoupled applications.

## Features
- Allows registration of event listeners.
- Supports multiple event listeners for a single event.
- Emits events with optional data.
- Enables removal of event listeners.

## Usage
To use the `EventEmitter`, create an instance and register events:

```typescript
import EventEmitter from './EventEmitter';

const emitter = new EventEmitter();

// Registering an event listener
emitter.on('eventName', (data) => {
  console.log('Event received:', data);
});

// Emitting the event
emitter.emit('eventName', { key: 'value' });

// Removing a listener
const listener = (data) => console.log('Another Event:', data);
emitter.on('anotherEvent', listener);
emitter.off('anotherEvent', listener);
```

## Methods

### `on(event: string, listener: (...args: any[]) => void): void`
Registers an event listener for the specified event.

```typescript
on(event: string, listener: (...args: any[]) => void): void {
  // Implementation to add the listener to the event's listener array
}
```

### `off(event: string, listener: (...args: any[]) => void): void`
Removes a specific listener from the event's listener array.

```typescript
off(event: string, listener: (...args: any[]) => void): void {
  // Implementation to remove the listener
}
```

### `emit(event: string, ...args: any[]): void`
Emits the specified event, invoking all registered listeners with the provided arguments.

```typescript
emit(event: string, ...args: any[]): void {
  // Implementation to trigger all listeners for the event
}
```

### `once(event: string, listener: (...args: any[]) => void): void`
Registers a one-time event listener for the specified event. The listener is automatically removed after it is invoked once.

```typescript
once(event: string, listener: (...args: any[]) => void): void {
  // Implementation to register a one-time listener
}
```

## Example
Here’s an example of how to use `EventEmitter` in a chat application:

```typescript
const chatEvents = new EventEmitter();

// Listen for a new message
chatEvents.on('newMessage', (message) => {
  console.log('New message:', message);
});

// Emit a new message event
chatEvents.emit('newMessage', 'Hello, world!');

// One-time listener for a user joining
chatEvents.once('userJoined', (username) => {
  console.log(`${username} has joined the chat!`);
});

// Emit userJoined event
chatEvents.emit('userJoined', 'Alice');
// Subsequent emits will not trigger the listener
chatEvents.emit('userJoined', 'Bob');
```

## Benefits
Using `EventEmitter.ts` promotes:
- Decoupling of components.
- Easier maintainability and scalability.
- Enhanced reusability of event-driven logic.