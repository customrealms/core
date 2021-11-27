# Entity types

Adding Minecraft entity types to CustomRealms can be somewhat confusing, so this README explains how it's done, and why it's designed the way it is.

## Multi-inheritance

In the Bukkit API (Java), an entity class like `Sheep` implements tons of interfaces: `Creature`, `Damageable`, `Entity`, etc. We mirror these different types in this directory; however, we're lucky because we don't have to worry about the implementation differences between different entity types.

For instance, in the Java Bukkit code, `Creeper` and `Sheep` both implement `Damageable`, so each has to have its own implementation of methods like `getMaxHealth()`, etc. In our TypeScript code, every `Damageable` has the **exact same** implementation of `getMaxHealth()`, and it always looks like this:

```ts
public getMaxHealth(): number {
    return this.toJava().getMaxHealth();
}
```

Because every class will have the exact same implementation, it would cause a lot of code duplication if we made `Damageable` an interface and implemented its methods repeatedly on every subclass. Instead, we use a **mixin** pattern.

Instead of being an interface, our `Damageable` is a class that contains all the default implementations.

This pattern of using mixin classes instead of interfaces repeats for many other types: `Damageable`, `LivingEntity`, `HumanEntity`, and many more.

## Implementing an Entity type

For concrete (non-abstract) entity types like `Sheep` or `Creeper`, the implementation looks like this:

```ts
export interface Sheep extends Animals, Colorable {}

@Extends(Animals, Colorable)
export class Sheep implements ToJava {
	//============================================================
	// Constructor and ToJava methods should be on every class
	//============================================================

	private constructor(private _sheep: Java.Value) {}

	public toJava(): Java.Value {
		return this._sheep;
	}

	//============================================================
	// Sheep-specific methods go here
	//============================================================

	public isSheared(): boolean {
		return this.toJava().isSheared();
	}

	public setSheared(flag: boolean): void {
		this.toJava().setSheared(flag);
	}
}
```

(Note above: you need to make both an `interface Sheep` and a `class Sheep` to ensure all the code editor hints work correctly)

If you're implementing an abstract entity type, like `Damageable`, it looks exactly the same, but you can leave out the constructor and `toJava` method.

## About the `@Extends(...)` decorator

It's a custom-made decorator that allows us to achieve multiple-inheritance by dynamically merging superclass prototypes into the subclass.

It helps us get around a limitation in TypeScript (not allowing multiple-inheritance).
