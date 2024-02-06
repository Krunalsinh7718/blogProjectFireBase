import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

function RTE({
    name,
    label,
    control,
    defaultValue = "" ,
    className,
    ...props
}) {

    return ( <>
        <div className={`w-full ${className}`}>
            {label && <label className="text-base font-medium text-gray-900">{label}</label>}
            <div>
                <Controller 
                name={name || "Content"}
                control={control}
                rules={{ required: "This is required." }}
                render={({field : {onChange}}) => (
                    <Editor 
                        initialValue={defaultValue}
                        apiKey={conf.tinymiceApiKey}
                        init={{
                            height : 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | h1 h2 h3 h4 | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />
                )}/>
            </div>
        </div>
    </> );
}

export default RTE;