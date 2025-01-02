import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryType, PartialTransactionSchema, PartialTransactionType } from '@/types/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { useGetUserInfo } from '@/features/user';
import { useGetUserCategories } from '@/features/categories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useCreateUserTransaction } from '@/features/transactions';

const AddTransactionModal = () => {
    const [open, setOpen] = useState(false);
    const { data: user } = useGetUserInfo();
    const { data: categories } = useGetUserCategories(user!);
    const { mutate: createTransaction, isPending: isPendingTransactionCreation } = useCreateUserTransaction(user!);
    const form = useForm<PartialTransactionType>({
        resolver: zodResolver(PartialTransactionSchema),
        defaultValues: {
            id: undefined,
            categoryId: '',
            userId: '',
            amount: '',
            description: '',
        },
    });

    const { setValue } = form;

    useEffect(() => {
        if (user && user.id) {
            setValue('userId', user.id);
        }
    }, [user]);

    const findCategoryNameById = (id: string) => {
        const category = categories.find((category: CategoryType) => category.id === id);
        return category ? category.name : '';
    };

    const onSubmit = (transactionPayload: PartialTransactionType) => {
        createTransaction(transactionPayload);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="noShadow">Add Transaction</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Make sure to choose the right category to ensure it gets marked the right transaction type.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-bold">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">₱</span>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                onBlur={(e) => field.onChange(parseFloat(e.target.value).toFixed(2))}
                                                className="pl-8"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g Bought groceries for the day" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white">
                                                <SelectValue placeholder="Transaction Category">
                                                    {field.value ? findCategoryNameById(field.value) : ''}
                                                </SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {categories.map((option: CategoryType) => (
                                                <SelectItem key={option.id} value={option.id.toString()}>
                                                    {option.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" variant="neutral">
                                Create Transaction
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTransactionModal;
