# infinite scrolling data
"Infinite" og "Pagination" er begge metoder til at håndtere visning af store lister af data på en brugergrænseflade.

#### Fordele i forhold til netværket:
1. Reduceret indlæsningstid: Ved at indlæse data løbende, når brugeren scroller, kan du reducere indlæsningstiden for siden i starten. Dette kan forbedre brugeroplevelsen, da brugere ikke behøver at vente på, at hele siden indlæses, før de kan begynde at udforske indholdet.

2. Lavere initiel belastning: Kun en lille mængde data indlæses først, hvilket resulterer i en mindre initial belastning på netværket og serveren. Dette kan være gavnligt, hvis brugere ikke altid udforsker hele datalisten.


### Infinite Scroll (Uendelig rulle):

Infinite Scroll er en teknik, hvor nye elementer indlæses automatisk, når brugeren scroller nedad på en liste eller en side. Dette skaber en glidende og kontinuerlig oplevelse for brugeren, da de ikke behøver at klikke på en separat "Næste side" eller "Indlæs mere" knap for at se mere indhold. I stedet hentes nye data, når brugeren nærmer sig slutningen af den nuværende liste.

For at implementere uendelig rulle i ReactJS, skal du overvåge scroll-positionen og derefter indlæse mere data, når brugeren kommer til et bestemt punkt. Dette kræver normalt asynkrone anmodninger (typisk AJAX eller fetch) for at hente flere data fra en server, som derefter tilføjes til den eksisterende liste af elementer på brugergrænsefladen.

### Pagination (Sideopdeling):

Pagination er en metode, hvor en stor liste af data opdeles i mindre sektioner kaldet "sider". Brugeren kan navigere gennem disse sider ved at klikke på forskellige nummererede knapper eller navigationsindikatorer, såsom "Forrige" og "Næste". Dette gør det muligt for brugere at se en begrænset mængde data ad gangen og forbedrer generelt ydeevnen ved at reducere belastningen på serveren og klienten.

For at implementere sideopdeling i ReactJS opretter du normalt en komponent, der styrer den aktuelle side og antallet af elementer pr. side. Når brugeren skifter side, opdateres komponenten med det nye datasæt, der skal vises.

### Lazy Loading Gallery Infinite Scroll
Denne komponent implementerer en galleri-visning af billeder med en "lazys indlæsning" (lazy loading) tilgang ved hjælp af Intersection Observer-teknikken. Billederne indlæses kun, når de kommer ind i brugerens synlige område. Samtidig inkluderer komponenten også "uendelig rulle" funktionalitet, der automatisk indlæser flere billeder, når brugeren scroller ned gennem galleriet.

## Brug
    npm i @tanstack/react-query
    npm i @mantine/hooks
