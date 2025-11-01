import { FormEvent, ChangeEvent, useState } from 'react';
// TODO: Replace Inertia useForm with useState + fetch
import { useToast } from '../ui/use-toast';
import InputCustom from '../common/InputCustom';
import BtnPrimary from '../common/BtnPrimary';
import SelectCustom from '../common/SelectCustom';

const CategoryForm = () => {
    const [data, setDataState] = useState({
        title: '',
        parent_id: '',
        menu_order: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const setData = (name: string, value: any) => {
        setDataState((prev) => ({ ...prev, [name]: value }));
    };

    const reset = () => setDataState({ title: '', parent_id: '', menu_order: '' });

    const post = async (
        url: string,
        opts: { data: FormData; onSuccess?: () => void; onError?: (e: any) => void }
    ) => {
        setProcessing(true);
        setErrors({});
        try {
            const res = await fetch(url, { method: 'POST', body: opts.data });
            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                opts.onError?.(json);
            } else {
                opts.onSuccess?.();
            }
        } catch (e) {
            opts.onError?.(e);
        } finally {
            setProcessing(false);
        }
    };

    const categories = [
        { value: null, title: 'Select Category (optional)' },
        { id: 1, value: 9, title: 'Select 1 Category' },
        { id: 2, value: 9, title: 'Select 2 Category' },
        { id: 3, value: 9, title: 'Select 3 Category' },
        { id: 4, value: 9, title: 'Select 4 Category' },
    ];

    const { toast } = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('parent_id', data.parent_id);
        formData.append('menu_order', data.menu_order);

        post('/api/categories', {
            data: formData,
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Category added successfully.',
                    description: '',
                });
                reset();
            },
            onError: (errors) => {
                const errorMessage =
                    errors?.message || 'Error in form submission';
                toast({
                    variant: 'destructive',
                    title: 'Category creation Failed.',
                    description: errorMessage,
                });
            },
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setData(name as any, files?.[0] || null);
        } else {
            setData(name as any, type === 'number' ? parseFloat(value) : value);
        }
    };

    const handleSelectChange = (value: any) => {
        setData('parent_id', value?.id);
    };

    return (
        <section className="py-6">
            <div className="card shadow p-8 max-w-4xl mx-auto">
                <form id="bookForm" onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-2 gap-5 mb-5">
                        <div className="lg:col-span-2">
                            <InputCustom
                                type="text"
                                name="title"
                                placeholder="Enter Category title"
                                value={data.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="">
                            <InputCustom
                                type="number"
                                name="menu_order"
                                placeholder="Enter Menu Order"
                                value={data.menu_order}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <SelectCustom
                                value={data.parent_id}
                                name="Select Parent (Optional)"
                                onChange={handleSelectChange}
                                options={categories}
                            />
                        </div>
                    </div>
                    <BtnPrimary fullWidth disabled={processing}>
                        {processing ? 'Adding category....' : 'Add Category'}
                    </BtnPrimary>
                </form>
            </div>
        </section>
    );
};

export default CategoryForm;
