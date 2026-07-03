import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/components/Table.css';
import { InputControl } from "./InputControl";
import { ComboControl } from "./ComboControl";

export const Table = ({ columns, data, options, checkboxs, showId, showForeignKeys, onCheckboxChange }) => {

    const [columnsWidth, setColumnsWidth] = useState([]);
    const [isResizing, setIsResizing] = useState(false);
    const [resizingColumn, setResizingColumn] = useState(null);

    const startX = useRef(0);
    const startWidth = useRef(0);

    useEffect(() => {
        setColumnsWidth(columns.map((c, i) => c.width));
        setColumnsWidth(prev => [...prev, 120]);
    }, [columns]);

    const handleMouseDown = (e, columnIndex) => {
        setIsResizing(true);
        setResizingColumn(columnIndex);
        startX.current = e.clientX;
        startWidth.current = columnsWidth[columnIndex];

        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
        e.preventDefault();
    }

    const handleMouseMove = (e) => {
        if (!isResizing || resizingColumn == null) return;

        const diff = e.clientX - startX.current;
        const newW = Math.max(100, startWidth.current + diff);

        setColumnsWidth(prev => {
            const newWidths = [...prev];
            newWidths[resizingColumn] = newW;
            return newWidths;
        });
    }

    const handleMouseUp = () => {
        setIsResizing(false);
        setResizingColumn(null);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isResizing, resizingColumn]);

    return (
        <table className="table">
            <thead>
                <tr>
                    {
                        columns ?
                            options ?
                                columns.map((c, i) => (
                                    <th style={{
                                        width: `${columnsWidth[i]}px`
                                    }} key={i}>
                                        {c.name}
                                        {
                                            i < columns.length && (
                                                <div
                                                    className="column-resize"
                                                    onMouseDown={(e) => handleMouseDown(e, i)}
                                                />
                                            )
                                        }
                                    </th>
                                ))
                                :
                                columns.map((c, i) => (
                                    <th style={{
                                        width: `${columnsWidth[i]}px`
                                    }} key={i}>
                                        {c.name}
                                        {
                                            i < columns.length - 1 && (
                                                <div
                                                    className="column-resize"
                                                    onMouseDown={(e) => handleMouseDown(e, i)}
                                                />
                                            )
                                        }
                                    </th>
                                ))
                            : undefined
                    }
                    {
                        options ?
                            <th className="columnOptions" style={{ width: `${columnsWidth[columnsWidth.length - 1]}px` }}>
                                Opciones
                            </th> : undefined
                    }
                </tr>
            </thead>
            <tbody>
                {
                    Array.isArray(data) && data.length > 0 ?
                        data.map((obj, i) =>
                            <tr key={i}>
                                {
                                    checkboxs ?
                                        Object.entries(obj).map(([key, value], i2) => {
                                            if (showId === false && key === 'id') {
                                                return null;
                                            }
                                            if (typeof value === "object" && value !== null && "check" in value) {
                                                return (<td key={i2}>
                                                    <div className="tdCheck">{value[key]} <InputControl type={"checkbox"} typeCheckbox={2}
                                                        checked={value.check}
                                                        onclick={(checked) => onCheckboxChange?.(obj, checked)} /></div>
                                                </td>);
                                            } else
                                                return (<td key={i2}>{value}</td>);
                                        })
                                        : Object.entries(obj).map(([key, value], i2) => {
                                            if (showId === false && key === 'id') {
                                                return null;
                                            }
                                            return (<td key={i2}>{value}</td>);
                                        })
                                }{
                                    options ?
                                        <td>
                                            <div className="optionsContainer">
                                                {
                                                    options.map((v, i) => {
                                                        if (v.value == "eye")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnLightBlue"
                                                                onClick={() => v.onclick && v.onclick(obj)}>visibility</span>);
                                                        else if (v.value == "edit")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnGreen"
                                                                onClick={() => v.onclick && v.onclick(obj)}>edit</span>
                                                            );
                                                        else if (v.value == "delete" || v.value == "remove")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnRed"
                                                                onClick={() => v.onclick && v.onclick(obj)}>
                                                                delete
                                                            </span>);
                                                        else if (v == "switch")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnRed">do_not_disturb_on</span>);
                                                        else if (v.value == "degrees")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnOrange"
                                                                onClick={() => v.onclick && v.onclick(obj)}>license</span>
                                                            );
                                                        else if (v.value == "docs")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnLightBlue"
                                                                onClick={() => v.onclick && v.onclick(obj)}>
                                                                docs
                                                            </span>);
                                                        else if (v.value == "curriculum")
                                                            return (
                                                                <span key={i} className="material-symbols-outlined tableBtnLightPurple"
                                                                    onClick={() => v.onclick && v.onclick(obj)}>
                                                                    two_pager
                                                                </span>
                                                            );
                                                        else if (v.value == "academicYear")
                                                            return (
                                                                <span key={i} className="material-symbols-outlined tableBtnLightPurple"
                                                                    onClick={() => v.onclick && v.onclick(obj)}>
                                                                    two_pager
                                                                </span>
                                                            )
                                                        else if (v == "subjects")
                                                            return (<NavLink key={i} to={"/carreras/plan-de-estudio/ciclo-academico/1/espacios-curriculares"}>
                                                                <span className="material-symbols-outlined tableBtnPurple">
                                                                    home_storage
                                                                </span>
                                                            </NavLink>)
                                                        else if (v.value == "commission")
                                                            return (
                                                                <span className="material-symbols-outlined tableBtnLightGreen"
                                                                    onClick={() => v.onclick && v.onclick(obj)}>
                                                                    group_work
                                                                </span>
                                                            )
                                                        else if (v.value == "teacher")
                                                            return (
                                                                <span className="material-symbols-outlined tableBtnLightGreen"
                                                                    onClick={() => v.onclick && v.onclick(obj)}>
                                                                    co_present
                                                                </span>
                                                            )
                                                        else if (v.value == "correlatives")
                                                            return (
                                                                <span key={i} className="material-symbols-outlined tableBtnOrange"
                                                                    onClick={() => v.onclick && v.onclick(obj)}>
                                                                    sync_alt
                                                                </span>
                                                            )
                                                        else if (v.value == "subjectsTeacher")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnGreen"
                                                                onClick={v.onclick ? v.onclick : undefined}>
                                                                co_present
                                                            </span>);
                                                        else if (v.value == "exams")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnOrange"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                calendar_add_on
                                                            </span>)
                                                        else if (v.value == "attendance")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnLightBlue"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                list_alt_check
                                                            </span>)
                                                        else if (v.value == "present")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnGreen"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                check
                                                            </span>)
                                                        else if (v.value == "absent")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnRed"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                close
                                                            </span>)
                                                        else if (v.value == "justified")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnOrange"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                rule
                                                            </span>)
                                                        else if (v.value == "finalExams")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnLightPurple"
                                                                onClick={v.onclick ? v.onclick : undefined}>
                                                                table_restaurant
                                                            </span>)
                                                        // MEJORARLO ------------------------------------------------------------
                                                        else if (v.value == "newGrade")
                                                            return (
                                                                <>
                                                                    <input key={i} className="tableInputNewGrade " type="text"
                                                                        onChange={(e) => v.onchange && v.onchange(obj, e.target.value)} />
                                                                    <span key={i} className="material-symbols-outlined tableBtnOrange"
                                                                        onClick={() => v.onclick ? v.onclick : {}}>
                                                                        rule
                                                                    </span>
                                                                </>
                                                            )
                                                        // MEJORARLO ------------------------------------------------------------
                                                        else if (v.value == "contact")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnLightGreen"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                contact_phone
                                                            </span>)
                                                        else if (v.value == "observation")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnPurple"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                eye_tracking
                                                            </span>)
                                                        else if (v.value == "ubication")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnOrange"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                location_away
                                                            </span>)
                                                        else if (v.value == "schedule")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnLightBlue"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                nest_clock_farsight_analog
                                                            </span>)
                                                        else if (v.value == "change_status_student_in_danger")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnGreen"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                pinboard
                                                            </span>)
                                                        else if (v.value == "folder")
                                                            return (
                                                                <span key={i} className="material-symbols-outlined tableBtnLightBlue"
                                                                    onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                    folder
                                                                </span>)
                                                    })
                                                }
                                            </div>
                                        </td>
                                        : undefined
                                }
                            </tr>)
                        :
                        <tr>
                            <td colSpan={columns.length + 1}>¡No hay datos a mostrar aún!</td>
                        </tr>
                }
            </tbody>
        </table >
    );
}