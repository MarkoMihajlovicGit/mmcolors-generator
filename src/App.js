import React from 'react';
import usePaletteState from './hooks/usePaletteState';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Palette from './Palette';
import Page from './Page';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
  const { palettes, savePalette, deletePalette, findPalette } = usePaletteState(
    seedColors
  );

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <Page>
                    <NewPaletteForm
                      savePalette={savePalette}
                      {...routeProps}
                      palettes={palettes}
                    ></NewPaletteForm>
                  </Page>
                )}
              ></Route>
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    ></PaletteList>
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                  <Page>
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                  <Page>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </Page>
                )}
              ></Route>
              <Route
                render={routeProps => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    ></PaletteList>
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    ></Route>
  );
}

export default App;
