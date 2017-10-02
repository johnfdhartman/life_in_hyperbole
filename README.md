Project proposal: I'm going to make a variant of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
for the Poincare Disc model of the [hyperbolic plane](https://en.wikipedia.org/wiki/Hyperbolic_geometry). That is, the project
will render a [tiling of the hyperbolic plane](https://en.wikipedia.org/wiki/Uniform_tilings_in_hyperbolic_plane), and each tile will represent a single cell.
The rules of the game will probably just be that of life,
but may be changed depending on what has the best dynamic behaviour.
Same goes for the tiling - So far the heptagonal tiling seems like it would
have the most 'life-like' behaviour and would be the easiest for the user
to understand. An example of a similar interactive rendering of a tiling
can be found [here](http://www.malinc.se/math/noneuclidean/poincaretilingen.php),
although it does not have cellular automata.

The basic functionality I want to implement is a static rendering of a single
tiling with a single rule. Once this has been finished, I will add other
nice features, such as being able to re-center the plane, or better colouring
rules for tiles, or letting the user choose the tiling and the game rules.

This project makes heavy use of [ItsNickBarry's hyperbolic-canvas](https://github.com/ItsNickBarry/hyperbolic-canvas)
 library.
