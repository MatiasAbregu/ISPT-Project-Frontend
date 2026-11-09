import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { Footer } from '../../components/Footer'
import { InputControl } from '../../components/InputControl'
import { Sidebar } from '../../components/Sidebar'
import { UserContext } from '../../context/UserProvider'
import NewsYUP from '../../schemas/news/NewsYUP'
import NewsService from '../../services/news/NewsService'
import '../../styles/pages/news/News.css'

export const News = () => {
    const { user } = useContext(UserContext)
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [saving, setSaving] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(NewsYUP),
        defaultValues: { title: '', content: '' }
    })
    const { register: registerSearch, watch: watchSearch } = useForm({
        defaultValues: { search: '' }
    })
    const search = watchSearch('search') ?? ''

    const canView = user?.roles.some(role => ['Estudiante', 'Directivo', 'Preceptor'].includes(role))
    const canCreate = user?.roles.some(role => ['Directivo', 'Preceptor'].includes(role))

    const getNews = useCallback(async () => {
        setLoading(true)
        try {
            const response = await NewsService.getAll()
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                setNews(response.data.object ?? [])
            }
        } catch (error) {
            if (error.response?.data?.message) toast.error(error.response.data.message)
            else toast.error('No se pudieron cargar las novedades.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        document.title = 'ISPT - Novedades'
        if (canView) getNews()
    }, [canView, getNews])

    const filteredNews = useMemo(() => {
        const term = search.trim().toLocaleLowerCase('es')
        if (!term) return news
        return news.filter(item => `${item.title} ${item.content} ${item.authorName ?? ''}`.toLocaleLowerCase('es').includes(term))
    }, [news, search])

    const closeForm = () => {
        setShowForm(false)
        reset()
    }

    const publishNews = async (formData) => {
        setSaving(true)
        try {
            const response = await NewsService.create({
                title: formData.title.trim(),
                content: formData.content.trim()
            })
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                toast.success(response.data.message || 'Novedad publicada.')
                closeForm()
                await getNews()
            }
        } catch (error) {
            if (error.response?.data?.message) toast.error(error.response.data.message)
            else toast.error('No se pudo publicar la novedad.')
        } finally {
            setSaving(false)
        }
    }

    const deleteNews = async (id) => {
        setDeletingId(id)
        try {
            const response = await NewsService.delete(id)
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                toast.success(response.data.message || 'Novedad eliminada.')
                setConfirmDeleteId(null)
                await getNews()
            }
        } catch (error) {
            if (error.response?.data?.message) toast.error(error.response.data.message)
            else toast.error('No se pudo eliminar la novedad.')
        } finally {
            setDeletingId(null)
        }
    }

    if (!canView) return <Navigate to="/" replace />

    return (
        <article className="newsPage">
            <Sidebar />
            {showForm && (
                <div className="modalBackground" onMouseDown={event => event.target === event.currentTarget && closeForm()}>
                    <article className="newsModal">
                        <button type="button" className="material-symbols-outlined close" aria-label="Cerrar formulario" onClick={closeForm}>cancel</button>
                        <h4>Publicar novedad</h4>
                        <div className="newsFormContainer">
                            <form className="newsForm" onSubmit={handleSubmit(publishNews)}>
                                <InputControl icon="campaign" type="textbox" data="title" register={register} error={errors.title}>
                                    Título de la novedad
                                </InputControl>
                                <InputControl icon="subject" type="textarea" data="content" register={register} error={errors.content}>
                                    Descripción de la novedad
                                </InputControl>
                                <button type="submit" className="add-button" disabled={saving}>
                                    <span className="material-symbols-outlined">save</span>
                                    {saving ? 'Publicando…' : 'Publicar novedad'}
                                </button>
                            </form>
                        </div>
                    </article>
                </div>
            )}
            <div className="newsPageContainer">
                <header className="newsControls">
                    <InputControl icon="search" type="search" data="search" register={registerSearch} />
                    {canCreate && <button type="button" className="newsAddButton" onClick={() => setShowForm(true)}>
                        <span className="material-symbols-outlined">add_circle</span>Publicar novedad
                    </button>}
                </header>
                <h1 className="newsTitle">Novedades</h1>
                <section className="newsList" aria-live="polite">
                    {loading ? <div className="newsState"><span className="material-symbols-outlined">hourglass_top</span>Cargando novedades…</div>
                        : filteredNews.length ? filteredNews.map(item => (
                            <article className="newsCard" key={item.id}>
                                <div className="newsCardMarker"><span className="material-symbols-outlined">campaign</span></div>
                                <div className="newsCardBody">
                                    <div className="newsCardMeta">
                                        <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
                                        <span className="newsAuthor">Publicado por {item.authorName || 'Autor no disponible'}</span>
                                        {canCreate && <button type="button" className="newsDeleteButton" aria-label={`Eliminar ${item.title}`} title="Eliminar novedad" onClick={() => setConfirmDeleteId(item.id)}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>}
                                    </div>
                                    {confirmDeleteId === item.id && <div className="newsDeleteConfirm" role="alert">
                                        <span>¿Eliminar esta novedad?</span>
                                        <button type="button" className="newsDeleteCancel" onClick={() => setConfirmDeleteId(null)} disabled={deletingId === item.id}>Cancelar</button>
                                        <button type="button" className="newsDeleteAccept" onClick={() => deleteNews(item.id)} disabled={deletingId === item.id}>
                                            {deletingId === item.id ? 'Eliminando…' : 'Eliminar'}
                                        </button>
                                    </div>}
                                    <h2>{item.title}</h2>
                                    <p>{item.content}</p>
                                </div>
                            </article>
                        )) : <div className="newsState"><span className="material-symbols-outlined">notifications_off</span>
                            <span className="newsEmptyMessage">
                                {search ? 'No hay novedades que coincidan con la búsqueda.' : 'Todavía no hay novedades publicadas.'}
                            </span>
                        </div>}
                </section>
                <Footer />
            </div>
        </article>
    )
}
