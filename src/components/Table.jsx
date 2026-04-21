import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/components/Table.css';
import { InputControl } from "./InputControl";

export const Table = ({ columns, data, options, checkboxs }) => {

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
                    data ?
                        data.map((obj, i) =>
                            <tr key={i}>
                                {
                                    checkboxs ?
                                        Object.entries(obj).map(([key, value], i2) => {
                                            if (value.check == true) {
                                                return (<td key={i2}>
                                                    <div className="tdCheck">{value[key]} <InputControl type={"checkbox"} typeCheckbox={2} /></div>
                                                </td>);
                                            } else
                                                return (<td key={i2}>{value}</td>);
                                        })
                                        : Object.entries(obj).map(([key, value], i2) => <td key={i2}>{value}</td>)
                                }{
                                    options ?
                                        <td>
                                            <div className="optionsContainer">
                                                {
                                                    options.map((v, i) => {
                                                        if (v.value == "eye")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnVisibility" onClick={v.onclick ? v.onclick : undefined}>visibility</span>);
                                                        else if (v.value == "edit")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnEdit"
                                                                onClick={v.onclick ? v.onclick : undefined}>edit</span>
                                                            );
                                                        else if (v == "delete" || v == "remove")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnDelete">delete</span>);
                                                        else if (v == "switch")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnDisturb">do_not_disturb_on</span>);
                                                        else if (v.value == "degrees")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnDegrees"
                                                                onClick={v.onclick ? v.onclick : undefined}>license</span>
                                                            );
                                                        else if (v.value == "docs")
                                                            return (<span className="material-symbols-outlined tableBtnDocs"
                                                                onClick={v.onclick ? v.onclick : undefined}>
                                                                docs
                                                            </span>);
                                                        else if (v == "curriculum")
                                                            return (<NavLink to={"/carreras/curriculum"}>
                                                                <span key={i} className="material-symbols-outlined tableBtnCurriculum">
                                                                    two_pager
                                                                </span>
                                                            </NavLink>)
                                                        else if (v == "academicYear")
                                                            return (<NavLink to={"/carreras/curriculum/ciclo-academico"}>
                                                                <span key={i} className="material-symbols-outlined tableBtnAcademicYear">
                                                                    two_pager
                                                                </span>
                                                            </NavLink>)
                                                        else if (v == "subjects")
                                                            return (<NavLink to={"/carreras/curriculum/ciclo-academico/1/materias"}>
                                                                <span className="material-symbols-outlined tableBtnSubjects">
                                                                    home_storage
                                                                </span>
                                                            </NavLink>)
                                                        else if (v.value == "correlatives")
                                                            return (<NavLink to={"/carreras/curriculum/materias/correlativas"}>
                                                                <span className="material-symbols-outlined tableBtnCorrelatives">
                                                                    sync_alt
                                                                </span>
                                                            </NavLink>)
                                                        else if (v == "teacher")
                                                            return (<span className="material-symbols-outlined tableBtnTeacher">
                                                                co_present
                                                            </span>)
                                                        else if (v == "correlatives2")
                                                            return (<NavLink to={"/careers/curriculum/correlatives/select"}>
                                                                <span className="material-symbols-outlined tableBtnCorrelatives">
                                                                    sync_alt
                                                                </span>
                                                            </NavLink>)
                                                        else if (v == "studentSubjects")
                                                            return (<NavLink to={"/inscriptions/student-subjects"}>
                                                                <span className="material-symbols-outlined tableBtnStudentSubjects">
                                                                    home_storage
                                                                </span>
                                                            </NavLink>)
                                                        else if (v == "finalExam")
                                                            return (<NavLink to={"/inscriptions/student-subjects/finalExam"}>
                                                                <span className="material-symbols-outlined tableBtnFinalExams">
                                                                    workspace_premium
                                                                </span>
                                                            </NavLink>)
                                                        else if (v == "grades")
                                                            return (<NavLink to={"/inscriptions/student-subjects/grades"}>
                                                                <span className="material-symbols-outlined tableBtnGrades">
                                                                    exposure_plus_1
                                                                </span>
                                                            </NavLink>)
                                                        else if (v.value == "present")
                                                            return (<span className="material-symbols-outlined tableBtnPresent"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                check
                                                            </span>)
                                                        else if (v.value == "absent")
                                                            return (<span className="material-symbols-outlined tableBtnAbsent"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                close
                                                            </span>)
                                                        else if (v.value == "tables")
                                                            return (<span className="material-symbols-outlined tableBtnTables"
                                                                onClick={v.onclick ? v.onclick : undefined}>
                                                                table_restaurant
                                                            </span>)
                                                        // MEJORARLO ------------------------------------------------------------
                                                        else if (v.value == "newGrade")
                                                            return (
                                                                <input className="tableInputNewGrade " type="text"
                                                                    onChange={(e) => v.onchange && v.onchange(obj, e.target.value)} />
                                                            )
                                                        else if (v.value == "save")
                                                            return (
                                                                <button className="material-symbols-outlined tableBtnSave"
                                                                    onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                    save
                                                                </button>
                                                            )
                                                        // MEJORARLO ------------------------------------------------------------
                                                        else if (v.value == "contact")
                                                            return (<span className="material-symbols-outlined tableBtnContact"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                contact_phone
                                                            </span>)
                                                        else if (v.value == "observation")
                                                            return (<span className="material-symbols-outlined tableBtnObservation"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                eye_tracking
                                                            </span>)
                                                        else if (v.value == "ubication")
                                                            return (<span className="material-symbols-outlined tableBtnUbication"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                location_away
                                                            </span>)
                                                    })
                                                }
                                            </div>
                                        </td>
                                        : undefined
                                }
                            </tr>)
                        : undefined
                }
            </tbody>
        </table>
    );
}