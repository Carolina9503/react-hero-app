import { mount, shallow } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroesScreen } from '../../components/heroes/HeroesScreen';

 

 describe('Pruebas en mi <HeroScreen/>', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }
    test('debe de mostrar el componente Redirect si no hay argumentos en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroesScreen history={ history } />
            </MemoryRouter>
        );
        // expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('Redirect').exists() ).toBe(true);

    });
    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroesScreen}/>
            </MemoryRouter> 

         );

         expect( wrapper.find('.row').exists() ).toBe(true);
        
    });

    test('debe regresar a la pantalla anterior con PUSH', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={() => <HeroesScreen history={ history } />}
                />
            </MemoryRouter> 
         );

         wrapper.find('button').prop('onClick')();

         expect( history.push ).toHaveBeenCalledWith('/');
         expect( history.goBack ).not.toHaveBeenCalled(); 

    });

    test('Debe de regresar a la pantalla anterior con goBack()', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={() => <HeroesScreen history={ history } />}
                />
            </MemoryRouter> 
        );
 
        wrapper.find('button').prop('onClick')();
        
        expect( history.goBack ).toHaveBeenCalled();
        expect( history.push ).toHaveBeenCalledTimes(0); // hace lo mismo que .not.toHaveBeenCalled()
        
    });

    test('debe de llamar el Redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider1122222']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={() => <HeroesScreen history={ history } />}
                />
            </MemoryRouter> 
        );

       expect( wrapper.text() ).toBe('');
        
    })
    
    
    
    
 })
 