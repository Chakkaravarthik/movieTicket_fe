import BarHeading from "../bar/bar"
import MovieList from "../Moviesearch/movieSearching"
import MovingCard from "../MovingCard/movingCard"


const HomeComponent = ({handleLogout})=>{

    return(
        <>
        <BarHeading handleLogout={handleLogout} />
        <MovingCard />
        <MovieList />
        </>
    )
}

export default HomeComponent;