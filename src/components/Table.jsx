import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/components/Table.css';
import { FilterContext } from "../context/FilterProvider";
import { InputControl } from "./InputControl";
import { ComboControl } from "./ComboControl";

const normalizeSearchText = (value) => String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");

const searchableText = (value) => {
    if (value == null || typeof value === "boolean") return "";
    if (Array.isArray(value)) return value.map(searchableText).join(" ");
    if (typeof value === "object") {
        return Object.entries(value)
            .filter(([key]) => key !== "check" && key !== "id" && key !== "state")
            .map(([, nestedValue]) => searchableText(nestedValue))
            .join(" ");
    }
    return String(value);
};

export const Table = ({ columns, data, options, checkboxs, checkboxReadOnly = false, showId, onCheckboxChange, hiddenColumns = [], renderCell, paginate = true }) => {
    const { searchTerm } = useContext(FilterContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [columnsWidth, setColumnsWidth] = useState([]);
    const [isResizing, setIsResizing] = useState(false);
    const [resizingColumn, setResizingColumn] = useState(null);

    const startX = useRef(0);
    const startWidth = useRef(0);
    const tableRef = useRef(null);

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

    const formatIfDateTime = (value) => {
        if (value == null) return "----";
        if (typeof value !== 'string') return value;

        const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

        if (isoDateTimeRegex.test(value)) {
            if (value.startsWith("0001-01-01")) {
                return "----";
            }

            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                return new Intl.DateTimeFormat('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).format(date);
            }
        }

        return value;
    };

    const renderCellValue = (row, key, value) => {
        const customValue = renderCell?.(row, key, value);
        return customValue !== undefined ? customValue : formatIfDateTime(value);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        setResizingColumn(null);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };

    const normalizedSearchTerm = normalizeSearchText(searchTerm.trim());
    const filteredData = Array.isArray(data) && normalizedSearchTerm
        ? data.filter(row => normalizeSearchText(searchableText(row)).includes(normalizedSearchTerm))
        : data;
    const totalRows = Array.isArray(filteredData) ? filteredData.length : 0;
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
    const visiblePage = Math.min(currentPage, totalPages);
    const paginatedData = paginate && Array.isArray(filteredData)
        ? filteredData.slice((visiblePage - 1) * pageSize, visiblePage * pageSize)
        : filteredData;

    useLayoutEffect(() => {
        const updatePageSize = () => {
            const table = tableRef.current;
            if (!paginate || !table || !Array.isArray(data) || data.length === 0) return;

            const tableTop = table.getBoundingClientRect().top;
            const headerHeight = table.querySelector("thead")?.getBoundingClientRect().height ?? 0;
            const rowHeight = table.querySelector("tbody tr")?.getBoundingClientRect().height ?? 0;
            if (rowHeight <= 0) return;

            // Reservar espacio para la paginación, el margen inferior y el footer.
            const availableHeight = window.innerHeight - tableTop - headerHeight - 90;
            const rowsThatFit = Math.max(1, Math.floor(availableHeight / rowHeight));
            setPageSize(previous => previous === rowsThatFit ? previous : rowsThatFit);
        };

        updatePageSize();
        window.addEventListener("resize", updatePageSize);
        const observer = typeof ResizeObserver !== "undefined"
            ? new ResizeObserver(updatePageSize)
            : null;
        if (tableRef.current && observer) observer.observe(tableRef.current);

        return () => {
            window.removeEventListener("resize", updatePageSize);
            observer?.disconnect();
        };
    }, [columns, data, normalizedSearchTerm, paginate]);

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchTerm]);

    useEffect(() => {
        if (visiblePage !== currentPage) setCurrentPage(visiblePage);
    }, [currentPage, visiblePage]);

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
        <div className="tableScrollContainer">
        <table className="table" ref={tableRef}>
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
                    Array.isArray(paginatedData) && paginatedData.length > 0 ?
                        paginatedData.map((obj, i) =>
                            <tr key={i}>
                                {
                                    checkboxs ?
                                        Object.entries(obj).map(([key, value], i2) => {
                                            if ((showId === false && key === 'id') || hiddenColumns.includes(key)) {
                                                return null;
                                            }
                                            if (typeof value === "object" && value !== null && "check" in value) {

                                                const textKey = Object.keys(value).find(k => k !== "check");
                                                const labelText = textKey ? value[textKey] : "";

                                                return (
                                                    <td key={i2}>
                                                        <div className="tdCheck">
                                                            {formatIfDateTime(labelText)}
                                                            <InputControl type={"checkbox"} typeCheckbox={2}
                                                                checked={value.check}
                                                                readonly={checkboxReadOnly}
                                                                onclick={(checked) => onCheckboxChange?.(obj, key, checked)} />
                                                        </div>
                                                    </td>);
                                            } else
                                                return (<td key={i2}>{formatIfDateTime(value)}</td>);
                                        })
                                        : Object.entries(obj).map(([key, value], i2) => {
                                            if ((showId === false && key === 'id') || key === 'state' || hiddenColumns.includes(key)) {
                                                return null;
                                            }
                                            return (<td key={i2}>{renderCellValue(obj, key, value)}</td>);
                                        })
                                }{
                                    options ?
                                        <td>
                                            <div className="optionsContainer">
                                                {
                                                    options.map((v, i) => {
                                                        if (typeof v.show === "function" && !v.show(obj)) return null;
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
                                                        else if (v.value == "cancel")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnRed" title="Quitar selección"
                                                                onClick={() => v.onclick && v.onclick(obj)}>
                                                                cancel
                                                            </span>);
                                                        else if (v.value == "switch") {
                                                            const isEnabled = Boolean(obj.state);
                                                            return (
                                                                <span key={i} className={`material-symbols-outlined ${isEnabled ? "tableBtnRed" : "tableBtnGreen "}`}
                                                                    onClick={() => v.onclick && v.onclick(obj)}>
                                                                    {isEnabled ? "do_not_disturb_on" : "check_circle"}
                                                                </span>);
                                                        }
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
                                                                <span key={i} className="material-symbols-outlined tableBtnLightGreen"
                                                                    onClick={() => v.onclick && v.onclick(obj)}>
                                                                    group_work
                                                                </span>
                                                            )
                                                        else if (v.value == "teacher")
                                                            return (
                                                                <span key={i} className="material-symbols-outlined tableBtnLightGreen"
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
                                                        else if (v.value == "iefi")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnLightPurple" title="IEFI"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                fact_check
                                                            </span>)
                                                        else if (v.value == "inscriptionRequests")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnOrange" title="Solicitudes de inscripción"
                                                                onClick={() => v.onclick && v.onclick(obj)}>
                                                                how_to_reg
                                                            </span>)
                                                        else if (v.value == "attendance")
                                                            return (<span key={i} className="material-symbols-outlined tableBtnLightBlue"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                list_alt_check
                                                            </span>)
                                                        else if (v.value == "present")
                                                            return (<span key={i} title={v.title} className="material-symbols-outlined tableBtnGreen"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                check
                                                            </span>)
                                                        else if (v.value == "absent")
                                                            return (<span key={i} title={v.title} className="material-symbols-outlined tableBtnRed"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                close
                                                            </span>)
                                                        else if (v.value == "resetDecision")
                                                            return (<span key={i} title={v.title} className="material-symbols-outlined tableBtnRed"
                                                                onClick={() => v.onclick && v.onclick(obj, i)}>
                                                                undo
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
                            <td colSpan={columns.length + 1}>{Array.isArray(data) && data.length > 0 && normalizedSearchTerm ? "No se encontraron resultados para la búsqueda." : "¡No hay datos a mostrar aún!"}</td>
                        </tr>
                }
            </tbody>
        </table >
        {paginate && totalRows > pageSize && (
            <div className="tablePagination" aria-label="Paginación de tabla">
                <span className="tablePaginationSummary">
                    {((visiblePage - 1) * pageSize) + 1}–{Math.min(visiblePage * pageSize, totalRows)} de {totalRows}
                </span>
                <div className="tablePaginationControls">
                    <button type="button" onClick={() => setCurrentPage(1)} disabled={visiblePage === 1} aria-label="Primera página">«</button>
                    <button type="button" onClick={() => setCurrentPage(page => Math.max(1, page - 1))} disabled={visiblePage === 1} aria-label="Página anterior">‹</button>
                    <span>Página {visiblePage} de {totalPages}</span>
                    <button type="button" onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))} disabled={visiblePage === totalPages} aria-label="Página siguiente">›</button>
                    <button type="button" onClick={() => setCurrentPage(totalPages)} disabled={visiblePage === totalPages} aria-label="Última página">»</button>
                </div>
            </div>
        )}
        </div>
    );
}
