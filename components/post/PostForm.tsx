import { useForm } from '@inertiajs/react';
import InputCustom from '../common/InputCustom';
import SubTitle from '../common/SubTitle';
import BtnPrimary from '../common/BtnPrimary';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect } from 'react';
import { fetchBooks } from '@/redux/features/book/bookSlice';
import CustomEditor from '../CustomEditor';
import { toast } from '../ui/use-toast';
import {
    categoriesList,
    fetchCategories,
} from '@/redux/features/category/categorySlice';
import SelectCustom from '../common/SelectCustom';
import { ICategory } from '@/types/globalTypes';

type Props = {};

function PostForm({}: Props) {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(categoriesList);

    const { books } = useAppSelector((state) => state.book);
    const { data, setData, post, errors, reset } = useForm({
        title: '',
        content: '',
        category_id: null,
    } as any);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const handleEditorChange = (content: string) => {
        setData('content', content);
    };
    console.log(categories);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('add_post'), {
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Post added successfully.',
                    description: '',
                });
                dispatch(fetchCategories());
                reset();
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'An error occurred. Please check the form and try again.',
                    description: '',
                });
            },
        });
    };

    return (
        <div className="card p-8 pt-6">
            <SubTitle>Add a Post</SubTitle>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 mt-3">
                    <label
                        htmlFor="chapterTitle"
                        className="block font-medium text-gray-700 pb-1"
                    >
                        Title
                    </label>
                    <InputCustom
                        type="text"
                        name="title"
                        value={data.title}
                        placeholder="Enter Post Title"
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <SelectCustom
                        name="Please select a category"
                        onChange={(item: ICategory) =>
                            setData('category_id', item?.id)
                        }
                        options={categories as any}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="chapterContent"
                        className="block font-medium text-gray-700 pb-1"
                    >
                        Description
                    </label>
                    <CustomEditor handleEditorChange={handleEditorChange} />
                </div>
                <div className="flex items-center">
                    <BtnPrimary type="submit">Add Post</BtnPrimary>
                </div>
            </form>
        </div>
    );
}

export default PostForm;
