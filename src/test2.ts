import 'reflect-metadata';

function Injectable(key: string) {
  return (target: Function) => {
    Reflect.defineMetadata(key, 'a', target);
    const meta = Reflect.getMetadata(key, target);
    console.log(meta);
  };
}

function Prop(target: Object, name: string) {}

function Inject(key: string) {
  return (target: Object, key: string, index: number) => {};
}

@Injectable('C')
export class C {
  @Prop prop: number;
}

@Injectable('D')
export class D {
  constructor(@Inject('C') c: C) {}
}
