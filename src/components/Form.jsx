import React from 'react';
import { firebase } from '../../firebase';
import { nanoid } from 'nanoid';

const Form = () => {
    <>
        <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Phone" />
            <textarea placeholder="Message"></textarea>
            <button>Send</button>
        </form>
    </>
};

export default Form;