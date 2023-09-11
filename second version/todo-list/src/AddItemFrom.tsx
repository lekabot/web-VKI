import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button, IconButton, TextField } from '@mui/material';
import { ControlPoint } from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}
export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required")
        }

    }
    return <div>
        <TextField
            variant='outlined'
            label='Type value'
            value={title}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeyPressHendler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTask} color={'primary'} size="large">
                <ControlPoint fontSize="inherit" />
            </IconButton>
    </div>
}