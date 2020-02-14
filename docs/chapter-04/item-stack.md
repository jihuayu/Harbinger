# `ItemStack`

你应该注意到了，`Item` 类下没有一个字段代表数量，换言之它没有数量的概念。它实际上只是一个物品种类的标记而已。想想看：

  * 一颗钻石和一组钻石都是钻石，只是数量不同。
  * 一块铁锭和一块金锭的数量相同，但它们不是同一种物品。
  * 一颗苹果和六颗苹果都一样能吃。

## 享元（Flyweight Pattern）

`Item` 代表了物品的“类型”。两颗钻石因为“都是钻石”所以能叠加在一起。两块不同的金属锭因为类型不同所以不能叠加在一起。
有数量概念的是 `ItemStack`，一个 `ItemStack` 的实例代表了“一堆特定物品，数量不定”。Minecraft 中玩家背包里的东西都是 `ItemStack`。玩家手持的也是 `ItemStack`。在此基础上，`ItemStack` 还有携带一个 NBT 标签的能力，这允许 `ItemStack` 携带更多的自定义数据。  
Minecraft 在这里采用了享元的概念：一种特定物品只对应一个 `Item` 实例。换言之，在 Modding 的过程中，我们可以直接通过 `==` 来判断两个物品是否为同一个种类。

## `Item` 是什么？

既然上文说到了 `Item` 实际上是指类型，那么不妨先来探讨一下物品的“类型”究竟是什么。考虑这么几个例子：

  * 一把快用坏的铁镐和一把刚做出来的铁镐都一样能挖石头，一样都需要用铁锭而不是金锭修复，虽然修复完好无损的铁镐没什么意义。
  * 不论你给命名牌改什么名，他们仍然是命名牌，只是你对着某个生物（实体）使用的时候会给予他们不同的名字。
  * 土豆不会因为你持有的数量而改变它的营养价值，也不会因为数量而改变它在熔炉里烤一下的产量。
  * 附魔书可以携带单种任意等级的任意魔咒，但它是附魔书的本质不会因为携带的魔咒或魔咒等级不同而改变。

一言以蔽之，不论 `ItemStack` 携带的信息如何改变，处理他们的逻辑都不会随之而转移。这些“逻辑”包括：

  * 使用/放置（左键/右键）的行为
  * 在客户端上显示的名称及 Tooltip
  * 合成配方
  * et cetera

实际上 `Item` 类下大多数方法、字段和上面的性质是对应的。
由此我们可以看到，所谓 `Item`，其实是对所有玩家通过 `ItemStack` 互动行为处理机制的逻辑所存放的类。就这一点来说，它的确符合享元模式的一般使用动机：

> Use sharing to support large numbers of fine-grained objects efficiently.
>
> \- "Design Patterns: Elements of Reusable Object-Oriented Software"

所有 `ItemStack` 在被实例化的时候必定指定了一个 `Item` 实例作为它的**类型**，相应的，该 `ItemStack` 的所有行为 (右键、挖掘方块、攻击实体、渲染、……) 都是交给 `ItemStack.getItem()` 返回的那个 `Item` 对象来处理的（`Item.onItemRightClick`、`Item.onItemUseFinish`、`Item.hitEntity`、`Item.onBlockDestroyed`、`Item.canHarvestBlock`、……）。也因此，刚才提到的方法的参数中都会包含一个 `ItemStack` 实例——它代表了该物品的具体**状态**。

其实，通过覆写这些方法，读者当然可以实现绝大部分自己想要的功能——但是十分麻烦，而且对其他mod的兼容性也会受影响(其实就是在造轮子)。

在 4.2 中将会介绍一些 `Item` 类的子类以及 `Item` 类其他的一些特性，以进一步阐述如何实现 `Item` 类。不过在此之前，请读者确保自己已经对上面所说的东西充分理解了。

## “空”

上文提到“所有 `ItemStack` 在被实例化的时候必定指定了一个 `Item` 实例作为它的**类型**”，但实际上有一个例外：`ItemStack` 类下的常量字段 `EMPTY` 初始化时没有使用 `Item` 实例，而是用了 `null`。相应地，它代表了“空”的状态，即这个 `ItemStack` 实质上什么都没有；更准确地说，它相当于持有 `Items.AIR`（即“空气”）这个物品，这在 Minecraft 的世界中等价于“无”。  
代表“空”的状态的不止这一个情况。当数量为非正数（小于等于零）的时候，这个 `ItemStack` 也会被认为是“空”的。构造 `ItemStack` 对象时使用 `Items.AIR` 效果也一样。

有鉴于对“空”的状态的明确定义，`ItemStack` 的引用在 Minecraft 中被看作是 non-null 的。换言之，任何出现 `ItemStack` 的地方都应视作“不可能为 `null`”。
至于判断给定 `ItemStack` 是不是空的，我们只需要调用 `isEmpty()` 就行了。

```java
ItemStack stack = ...;
if (!stack.isEmpty()) {
    // 仅当物品非空时继续操作
}
```
