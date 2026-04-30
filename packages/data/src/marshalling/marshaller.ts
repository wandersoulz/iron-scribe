import "reflect-metadata";
import { plainToInstance, ClassConstructor } from "class-transformer";

export class Marshaller {
  /**
   * Marshall a plain JSON object into a specific class instance.
   */
  public static marshall<T>(cls: ClassConstructor<T>, plain: T): T {
    if (!plain) return plain;
    return plainToInstance(cls, plain);
  }

  /**
   * Marshall an array of plain JSON objects into an array of class instances.
   */
  public static marshallArray<T>(
    cls: ClassConstructor<T>,
    plainArray: T[],
  ): T[] {
    if (!plainArray) return [];
    return plainToInstance(cls, plainArray);
  }
}
