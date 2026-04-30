# Iron Scribe

## Description

What is Iron Scribe? Well, it is a place to build and run a hero for the TTRPG Draw Steel. The name is a play on the Draw Steel's name (Draw ~ Scribe and Iron ~ Steel). This project will eventually sync all data to a central database and provide options for a Web UI (which is currently in development) as well as a mobile application (in pre-development using React Native).

There are competing projects that are already full featured and work incredibly well such as ForgeSteel and Draw Steel Tools for Owlbear Rodeo. What I am doing to differentiate this project from them is:

* This can be run completely independent of a virtual tabletop; no need to install an extension for OwlBear Rodeo (though I will at some point add this as a possibility)
* This will connect to data served through a self-hosted API/PostgresDB.
* Fully extensible data model; unlike ForgeSteel's data, you can use the model and hard coded data independent of the Iron Scribe applications.
* Fully documented data model and helper functions (work in progress, as is development).

I want Iron Scribe to be the go-to open source project for all things Draw Steel. Want to run a negotiation? Iron Scribe will handle that. Want to create a custom Ancestry with some wild options? Iron Scribe will handle that. 

I am also working on a data pipeline to automatically pull data from released materials for Draw Steel from MCDM so that Iron Scribe will always have the latest and greatest data.

As of right now, there are no plans to make this a subscribtion but I will eventually be implementing user authentication so that the application can persist user data not just in local storage but also in the database.

## Data Model

### Identifiable Model

Everything in this data model is `Identifiable`. So every model must ultimately inherit from this interface. With this model, everything will have an id field.

### Named Model (Inherits from Identifiable)

Almost everything in the game will have a name and this model allows us to assign everything with a name the `Model` interface. Ancestrys, Ancestry Traits are all examples of `Named` objects. Even individual skills and skill groups are named objects. However the selection of a specific skill, so associate that skill with a particular `Feature` (see below) is not named but will have an id.

### Component Model (Inherits from Named)

These are meant to be the "high-level" classes and models that are the "meaty" parts of what defined a Hero, NPC, or Monster. Ancestry, Culture, Class, etc. are all examples of Components.

### Feature Model (Inherits from Named)

Everything below a `Component` is considered a `Feature`. Specific traits on an Ancestry are all `Features` and any selections required for those traits, such as selected skill from a list, are also `Features`. The `Selection` and `Choice` models are described below.

### Choice Model (Inherits from Feature)

Choices are tricky to model since a choice can theoretically be any `Feature`. They will also need to contain a way to either get every possible option or enumerate all of the possible options. Modeling the "get" behavior in a way that can eventually be stored in a database is not entirely possible without some custom DSL/JSON representation which is not yet defined.

### Reference Model (Inherits from Identifiable)

To limit the size of what is injected into the OwlBear Rodeo room/player/scene states we need to have `Reference` models that contain only id data. An ancestry will have traits that contain ids of what, if any, selections were made at creation time. The `Reference` models are not for storing the actual game data with complete descriptions, but are the player's representation of the data that can be easily looked up when wanting to display that information.

### Sourcebook Model (Inherits from Named)

To look up actual data, with full descriptions we will have a `Sourcebook` model that contains all of the `Registers` for the specific `Components` and `Features` that book represents. For instance, the core Heroes sourcebook will have an "Ancestry" `Register` that has the description and lore description of the "Devil" ancestry. It will have a separate `Register` for all of the "Ancestry Traits" that we can easily look up specific "Devil" traits from. This separation of registries allows for partitions when loading and displaying the data making individual downloads quick and the UI feel more responsive.

### Library Model (Inherits from Identifiable)

We also know that MCDM and other publishers will be putting out content that adds Ancestries, Classes, Cultures, etc. With multiple sourcebooks, players will want to be able to use all of them or only a selection of them when building characters and playing the game. We model this with a `Library` model that allows for multiple `Sourcebooks` to contribute to `CompositeRegisters` when getting a specific `Component` or `Feature`. If we have the main "Heroes" book and then a separate "book" that only contains the Beastheart class, we would create a `Library` with both of these `Sourcebooks`; when getting the specific classes available from the library we will be given a `CompositeRegister` that contains the classes from both underlying `Sourcebooks`.

### Value Resolver Model (Inherits from Named)

There will be many values within Draw Steel that are calculated and updated depending of specific choices by the user. Players will have different selections for their characters that may grant them specific bonuses or base values for stats like Speed, Damage Immunity, Condition Immunity, Saving Throw target. GMs will have different monsters that may have abilities, that when active, add a bonus or override to a specific stat for that creature. The individual features and components don't need to know how to resolve these values themselves, but the Hero class would need to know how to resolve these values. The `Value Resolver` interface will add methods and functionality to resolve `Dynamic Values` to a specific number or list of strings. When calculating speed, we need to know what the base speed is as well as any bonus granted by whatever the player has chosen or added to their character, such as a Class Feature, Title, Kit, or Treasure, so the `Value Resolver` will find every `Component` or `Feature` that contains a `Modifier` for the "Speed" stat and work to resolve all of those modifiers down to a single value.

### Dynamic Value Model (Inherits from Identifiable)

A `Dynamic Value` can be any of the following: `LiteralValue`, `ConditionalValue`, `StatReferenceValue`, or `MathValue`.

#### Literal Value

This type of `Dynamic Value` represents a "real" or "concrete" value. For something that sets a new base "Speed", this would simply be a number. For something that grants a new `Skill` this would be a string value representing that skill (the id of the skill).

#### Conditional Value

A conditional values allow you to comoposite multiple literal, math, and stat values together to perform logical operations on a combination of these values. Every conditional will have a true and false outcome defined as well as what the "Condition" is; a condition can be a numeric or string value comparison, an "and" or "or" logical operator, or a look up for a specific component/feature.

#### Stat Reference Value

Some features may place a modification based on another of the character's stats. For instance, if the hero is a Devil with the "Wings" purchased trait, then there is a modifier that would depend on the character's level and flying status to add a damage weakness. The level would be considered a stat that can be referenced.

#### Math Value

If you need to combine two literal or numeric stat values, you can use a math value to perform simple arithmetic on these values.

### Hero Model (Inherits from Value Resolver)

A `Hero` is a generic object that contains different components. A component can be an Ancestry, Class, Culture, Career, Title, or anything else that is applied to a character at time of creation or can be added independent of their Ancestry, Class, Culture, or Career. The Hero, being a value resolver, know how to search through all of its components to see if it has a specific component/feature and be able to return any query of the hero itself. We will be able to call a function `getFeatures("skills")` to get all skills currently assigned to this hero through all features/components. We'll also be able to resolve specific stats such as Speed using a `getStat("speed")` function call to get modifiers for the "speed" stat and calculate what the value should be (If your Ancestry selection grants you a base speed of 5 and your class also grants you a base speed but is instead 7, the resolver would take the higher of the two). There would also be "override" values, such as the speed override from the "Dazed" condition which sets the character's speed to 0 until it is removed. The `Hero` class will also have a more directly accessible "combat state" object that contains all of the values that are expected to change frequently and would actually impact the hero more directly; these values would be current stamina, current recoveries, current number of heroic resources, etc.
