import React from 'react';
import { mount } from 'enzyme';
import { SearchScreen } from '../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';


describe('Pruebas en mi <SearchScreen/>', () => {

    test('debe de mostarse correctamente con los valores por defecto', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );
        expect( wrapper ).toMatchSnapshot();   
        expect( wrapper.find('.alert-info').text().trim()).toBe('Search hero');
    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );
        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();        
    });

    test('debe de mostrar un error si no se encuentra el Hero', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('There is no a hero with batman123')
        expect( wrapper ).toMatchSnapshot(); 
    });

    test('debe de llamar el PUSH del history', () => {

        const history = {
            push: jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route 
                    path="/search" 
                    component={ () => <SearchScreen history={ history } />  } />
            </MemoryRouter>
        );

        //simulacion del cambio en las cajas de texto
        wrapper.find('input').simulate('change',{
            target:{
                name:'searchText',
                value: 'batman'
            }
        });

        // simulacion del submit del formulario
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(history.push ).toHaveBeenCalledWith(`?q=batman`)

        
    })
    
    
    
    
})
