import { mount } from 'enzyme'
import { MemoryRouter, Router } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { Navbar } from '../../components/ui/Navbar'
import { types } from '../../types/types'



describe('Pruebas en <Navbar/>', () => {

    //pruebas en history.replace('/login');

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Fernando'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar/>
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>

    )
    //Limpiar el mock despues de cada prueba o antes es bueno hacerlo
    afterEach(() => {
        jest.clearAllMocks();
    })

    test('Debe de mostrarse correctamente ', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim()).toBe('Fernando')
    });

    test('debe de llamar el logout y tambien usar history', () => {

        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch).toHaveBeenCalledWith({
            type:types.logout
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/login');
        
    })
    
    
    
})
