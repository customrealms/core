import "../globals";
import { ToJava } from "../runtime/ToJava";
import { PotionEffectType } from "./PotionEffectType";

export class PotionEffect implements ToJava {

    /**
     * The underlying Java instance
     */
    private _java: any;

    /**
     * Constructs a new potion effect instance
     * @param type the type of potion effect
     * @param duration the duration of the effect
     * @param amplifier the amplifier amount for the effect
     * @param ambient makes the effect produce more particles
     * @param particles whether or not to emit particles
     * @param icon whether ot not the effect has an icon
     */
    public constructor(
        type: PotionEffectType,
        duration: number,
        amplifier: number,
        ambient?: boolean,
        particles?: boolean,
        icon?: boolean);

    /**
     * Constructs a potion effect from its java instance
     * @param _java the underlying Java instance
     */
    public constructor(_java: any);

    public constructor(...args: any[]) {
        if (args.length === 1) {
            this._java = args[0];
        } else {
            this._java = new (Java.resolve('org.bukkit.potion.PotionEffect'))(
                (args[0] as PotionEffectType).toJava(),
                args[1],
                args[2],
                args[3] ?? true,
                args[4] ?? true,
                args[5] ?? true
            );
        }
    }

    public toJava(): any {
        return this._java;
    }

    public getType(): PotionEffectType {
        const javaType = this.toJava().getType();
        return new PotionEffectType(javaType);
    }

    public getDuration(): number {
        return this.toJava().getDuration();
    }

    public hasIcon(): boolean {
        return this.toJava().hasIcon();
    }

    public hasParticles(): boolean {
        return this.toJava().hasParticles();
    }

    public isAmbient(): boolean {
        return this.toJava().isAmbient();
    }

}
