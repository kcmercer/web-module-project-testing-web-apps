import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)

    const h1 = screen.queryByText(/Contact Form/i)

    expect(h1).toBeInTheDocument();
    expect(h1).toBeTruthy()
    expect(h1).toHaveTextContent(/Contact Form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.queryByPlaceholderText('Edd')
  userEvent.type(firstNameInput, 'x');

  const fniError = screen.queryByText(/firstName must have at least 5 characters./i)
  expect(fniError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.queryByPlaceholderText('Edd');
  const lastNameInput = screen.queryByPlaceholderText('Burke');
  const emailInput = screen.queryByPlaceholderText('bluebill1049@hotmail.com');

  userEvent.type(firstNameInput);
  userEvent.type(lastNameInput);
  userEvent.type(emailInput);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const fniError = screen.queryByText(/firstName must have at least 5 characters./i)
  const lniError = screen.queryByText(/lastName is a required field/i)
  const eiError = screen.queryByText(/email must be a valid email address/i)

  expect(fniError).toBeInTheDocument();
  expect(lniError).toBeInTheDocument();
  expect(eiError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.queryByPlaceholderText('Edd');
  const lastNameInput = screen.queryByPlaceholderText('Burke');
  const emailInput = screen.queryByPlaceholderText('bluebill1049@hotmail.com');

  userEvent.type(firstNameInput, 'Edward');
  userEvent.type(lastNameInput, 'Burke');
  userEvent.type(emailInput);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const eiError = screen.queryByText(/email must be a valid email address/i)
  expect(eiError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />)

  const emailInput = screen.queryByPlaceholderText('bluebill1049@hotmail.com');
  userEvent.type(emailInput);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const eiError = screen.queryByText(/email must be a valid email address/i)
  expect(eiError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />)

  const lastNameInput = screen.queryByPlaceholderText('Burke');
  userEvent.type(lastNameInput);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const lniError = screen.queryByText(/lastName is a required field/i)
  expect(lniError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.queryByPlaceholderText('Edd');
  const lastNameInput = screen.queryByPlaceholderText('Burke');
  const emailInput = screen.queryByPlaceholderText('bluebill1049@hotmail.com');
  const messageInput = screen.queryByLabelText(/Message/i)

  userEvent.type(firstNameInput, 'Edward');
  userEvent.type(lastNameInput, 'Burke');
  userEvent.type(emailInput, 'bluebill1049@hotmail.com');
  userEvent.type(messageInput);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const fniDisplay = screen.getByTestId('firstnameDisplay');
  const lniDisplay = screen.getByTestId('lastnameDisplay');
  const eiDisplay = screen.getByTestId('emailDisplay');
  const miDisplay = screen.queryByTestId('messageDisplay');

  expect(fniDisplay).toBeInTheDocument();
  expect(lniDisplay).toBeInTheDocument();
  expect(eiDisplay).toBeInTheDocument();
  expect(miDisplay).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />)
});