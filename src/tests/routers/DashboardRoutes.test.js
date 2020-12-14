import React from 'react';
import { mount, shallow }from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';



describe('pruebas en <DashboardRoutes/>', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged: true,
            name: 'Carolina'

        }
    }
    
    test('debe mostrarse correctamente ', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>
            
        )
        // console.log(wrapper.html());
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim()).toBe('Carolina')
    })
    
})

