import React from 'react';
import { mount, shallow }from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';


describe('pruebas en <AppRouter/>', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe de mostrar el login si no esta autenticado', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter/>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();

        // console.log( wrapper.html() );
        
    });

    test('debe de mostrar el componente de mervel si esta autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Carolina'
            }
        }
       
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter/>
            </AuthContext.Provider>
        );

        expect( wrapper.find('.navbar').exists() ).toBe(true);

        // console.log( wrapper.html() );

        
    })
    
    
    
})
