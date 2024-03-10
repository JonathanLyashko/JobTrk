'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

import {
    JobStatus,
    JobMode,
    createAndEditJobSchema,
    CreateAndEditJobType
} from '@/utils/types';

import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";

import { CustomFormField, CustomFormSelect } from "./FormComponents";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobAction } from "@/utils/actions";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";


function CreateJobForm() {

    const form = useForm<CreateAndEditJobType>({
        resolver:zodResolver(createAndEditJobSchema),
        defaultValues: {
            position: '',
            company: '',
            location: '',
            status: JobStatus.Pending,
            mode: JobMode.FullTime,
        },
    });

    const queryClient = useQueryClient(); 
    const {toast} = useToast();
    const router = useRouter();
    const {mutate, isPending} = useMutation({
       mutationFn: (values:CreateAndEditJobType) => createJobAction(values),
       onSuccess: (data) => {
        if (!data) {
            toast({ description: 'There was an error' });
            return
        }
        toast({ description: 'Job created' });
        queryClient.invalidateQueries({ queryKey: ['jobs']});
        queryClient.invalidateQueries({ queryKey: ['stats']});
        queryClient.invalidateQueries({ queryKey: ['charts']});
        // form.reset()
        router.push('/jobs');
       }
    })

    function onSubmit(values:CreateAndEditJobType) {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
                <h2 className="capitalize font-semibold text-4xl mb-6">
                    Add job
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {/* position */}
                    <CustomFormField name="position" control={form.control} />
                    {/* company */}
                    <CustomFormField name="company" control={form.control} />
                    {/* location */}
                    <CustomFormField name="location" control={form.control} />
                    {/* status */}
                    <CustomFormSelect name="status" control={form.control} labelText="Job status" items={Object.values(JobStatus)} />
                    {/* moed */}
                    <CustomFormSelect name="mode" control={form.control} labelText="Job mode" items={Object.values(JobMode)} />

                    <Button type='submit' className="self-end capitalize" disabled={isPending}>
                        {isPending ? 'Loading...' : 'Create job'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateJobForm