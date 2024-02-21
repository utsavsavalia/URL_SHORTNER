import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DummyPage } from './src/pages/DummyPage'

export const Routes = () => {

    return (
        <Router>
            <Switch>
                <Route path = "/dummy">
                    <DummyPage />
                </Route>
            </Switch>
        </Router>
    )

}