
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



// 3. Strategy Patern
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

// 구현 - interface의 메소드를 재정의해서 사용
interface PaymentStrategy{
    public void pay(int number);
}

class KAKAOCardStrategy implements PaymentStrategy{
    private String name;
    private String cardNumber;
    private String cvv;
    private String dateOfExpiry;

    public KAKAOCardStrategy(String nm, String ccNum, String cvv, String exporyDate){
        this.name = nm;
        this.cardNumber = ccNum;
        this.cvv = cvv;
        this.dateOfExpiry = exporyDate;
    }

    @Override
    public void pay(int amount){
        System.out.println(amount + "paid using KAKAOCard.");
    }
}

class LUNACardStrategy implements PaymentStrategy{
    private String emailId;
    private String password;

    public LUNACardStrategy(String email, String pwd){
        this.emailId = email;
        this.password = pwd;
    }
    @Override
    public void pay(int amout){
        System.out.println(amount + "paid using LUNACard.");
    }
}

class Item{
    private String name;
    private int price;
    public Item(String name, int cost){
        this.name = name;
        this.price = cost;
    }
    public String getName(){
        return name;
    }
    public String getPrice(){
        return price;
    }
}

class ShoppingCart{
    List<Item> items;

    public ShoppingCart(){
        this.items = new ArrayList<Item>();
    }

    public void addItem(Item item){
        this.items.add(item);
    }

    public void removeItem(Item item){
        this.itmes.remove(item);
    }

    public int calculateTotal(){
        int sum = 0;
        for(Item item : items){
            sum += item.getPrice();
        }
    }
    return sum;

    public void pay(PaymentStrategy paymentMethod){
        int amount = calculateTotal();
        paymentMethod.pay(amount);
    }
}

public class HelloWorld{
    public static void main(String[].args) {
        ShoppingCart cart = new ShoppingCart();

        Item A = new Item("jaemin1", 100);
        Item B = new Item("jaemin2", 300);

        cart.addItem(A);
        cart.addItem(B);

        // 전략이라고 불리는 캡슐화된 알고리즘을 컨텍스트 안에서 바꿔주면서
        // 결제 전략만 바꿔서 다양한 방법으로 결제.
        card.pay(new LUNACardStrategy("bamer@naver.com", "1234"))
        card.pay(new KAKAOCardStrategy("bamer@naver.com", "1234", "123", "10/1"))        
    }
}

// 400 paid using LUNACard
// 400 paid using KAKAOCard