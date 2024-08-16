import React from 'react'
import "./add.css"
import { useForm } from 'react-hook-form';
import axios from "axios"
import { Notyf } from "notyf"
import 'notyf/notyf.min.css'; // for React, Vue and Svelte



const Add = ({ onClose }) => {
  const {
    register,
    handleSubmit,
  } = useForm()

  const notyf = new Notyf({
    position: {
      x: 'center',
      y: 'top',
    },
  });

  const addData = (data) => {
    axios.post("https://crud-db-pink.vercel.app/api/add", data)
      .then(res => {
        notyf.success("Готово! Продукт теперь в каталоге.")
        onClose()
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
        notyf.error("Ошибка при отправке данных")
      }
      )


  }



  return (
    <div className='modal'>
      <div className="modal-content">
        <span className='close' onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit(addData)} className='form'>
          <input type="text" name="rasm" id="" placeholder='Url изображения' {...register("rasm", { required: true })} />
          <input type="text" name="nomi" id="" placeholder='Названия' {...register("nomi", { required: true })} />
          <input type="number" name="soni" id="" placeholder='Количество' {...register("soni", { required: true })} />
          <input type="number" name="narxi" id="" placeholder='Цена' {...register("narxi", { required: true })} />
          <button>Отправка данных</button>
        </form>
      </div>
    </div>
  )
}

export default Add
