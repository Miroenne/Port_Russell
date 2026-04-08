

const Home = () => {

    return(
        <main>
            <div class="container-fluid row py-2 justify-content-evenly">           
        </div> 
        <div class="container-fluid row mt-5 p-2 text-center justify-content-center">
            <table class="mx-auto">
                <caption class="text-decoration-underline">
                    Réservations en cours
                </caption>
                <thead>
                    <tr>
                        <th>Numéro catway</th>                    
                        <th>Nom</th>
                        <th>Nom bâteau</th>
                        <th>Début de réservation</th>
                        <th>Fin de réservation</th>
                    </tr>                    
                </thead>
                <tbody>
                    <tr>
                        <td>3</td>
                        <th>Jack Sparrow</th>
                        <td>Black Pearl</td>
                        <td>01/10/2025</td>
                        <td>01/10/2026</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Numéro catway</th>    
                        <th>Nom</th>
                        <th>Nom bâteau</th>
                        <th>Début de réservation</th>
                        <th>Fin de réservation</th>
                    </tr>  
                </tfoot>
            </table>
        </div>  
        </main>
    )
}

export default Home;