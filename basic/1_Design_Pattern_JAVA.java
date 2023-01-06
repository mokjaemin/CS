
// 1. SingleTon Pattern of JAVA
// One instance

// Example 1
class SingleTon{
    private static class singleInstanceHolder{
        private static final SingleTon INSTACE = new SingleTon();
    }
    public static SingleTon getInstance(){
        return singleInstanceHolder.INSTANCE;
    }
}
public class HelloWorld{
    public static void main(String[] args){
        SingleTon a = SingleTon.getInstance();
        SingleTon b = SingleTon.getInstance();
        System.out.println(a.hashCode());
        System.out.println(b.hashCode());
        if(a == b){
            System.out.println(true);
        }
    }
}



// 2. Factory Pattern of JAVA

// Example 1
abstract class Coffee{
    public abstract int getPrice();

    @Override
    public String toString(){
        return "Hi this coffee is" + this.getPrice();
    }
}
class CoffeeFactory{
    public static Coffee getCoffee(String type, int price){
        if("Latte".equalsIgnoreCase(type)) return new Latte(price);
        else if("Americano".equalsIgnoreCase(type)) return new Americano(price);
        else{
            return new DefaultCoffee();
        }
    }
}
class DefaultCoffee extends Coffee{
    private int price;

    public DefaultCoffee(){
        this.price = -1;
    }

    @Override
    public int getPrice(){
        return this.price;
    }
}
class Latte extends Coffee{
    private int price;

    public Latte(int price){
        this.price = price;
    }

    @Override
    public int getPrice(){
        return this.price;
    }
}
class Americano extends Coffee{
    private int price;

    public Americano(int price){
        this.price = price;
    }

    @Override
    public int getPrice(){
        return this.price;
    }
}
public class HelloWorld{
    public static void main(String[] args){
        Coffee latte = CoffeeFactory.getCoffee("Latte", 4000);
        Coffee ame = CoffeeFactory.getCoffee("Americano", 3000);
        System.out.println("Factory latte ::" + latte);
        System.out.println("Factory ame ::" + ame);
    }
}
// Factory latte :: Hi this coffee is 4000
// Factory ame :: Hi this coffee is 3000